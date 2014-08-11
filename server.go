package main

import (
	"bytes"
	"fmt"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/binding"
	"github.com/martini-contrib/render"
	"github.com/russross/blackfriday"
	"github.com/sendgrid/sendgrid-go"
	"html/template"
	"io/ioutil"
	"os"
	"path/filepath"
)

func main() {
	m := martini.New()

	m.Use(martini.Logger())
	m.Use(martini.Recovery())
	m.Use(render.Renderer())

	if martini.Env == martini.Dev {
		m.Use(martini.Static("public"))
	}

	content := concatData("data")
	markdown := parseMarkdown(content)

	r := martini.NewRouter()

	r.Get("/", func(r render.Render) {
		r.HTML(200, "index", template.HTML(markdown))
	})

	r.Post("/contact", binding.Bind(Contact{}), func(contact Contact) (int, string) {
		body := fmt.Sprintf("%s\n\nEnvoyé depuis https://florentviel.com", contact.Content)
		sg := sendgrid.NewSendGridClient(os.Getenv("SENDGRID_USER"), os.Getenv("SENDGRID_KEY"))
		message := sendgrid.NewMail()

		message.AddTo(os.Getenv("SENDGRID_EMAIL"))
		message.AddToName("Florent Viel")
		message.SetSubject(contact.Object)
		message.SetText(body)
		message.SetFrom(contact.From)

		if r := sg.Send(message); r == nil {
			return 200, "ok"
		} else {
			return 500, "ko"
		}
	})

	m.Action(r.Handle)
	m.Run()
}

type Contact struct {
	From    string `form:"from" required`
	Object  string `form:"object" required`
	Content string `form:"content" required`
}

func concatData(dir string) bytes.Buffer {
	var content bytes.Buffer

	filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if _, err := filepath.Rel(dir, path); err != nil {
			return err
		}

		if !info.IsDir() {
			buf, err := ioutil.ReadFile(path)
			if err != nil {
				panic(err)
			}

			content.WriteString(string(buf))
		}

		return nil
	})

	return content
}

func parseMarkdown(content bytes.Buffer) string {
	markdown := blackfriday.MarkdownBasic(content.Bytes())

	return string(markdown)
}
