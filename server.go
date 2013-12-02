package main

import (
    "bytes"
    "fmt"
    "github.com/codegangsta/martini"
    "github.com/codegangsta/martini-contrib/form"
    "github.com/codegangsta/martini-contrib/render"
    "github.com/russross/blackfriday"
    "github.com/sendgrid/sendgrid-go"
    "html/template"
    "io/ioutil"
    "os"
    "path/filepath"
)

func main() {
    m := martini.Classic()
    m.Use(render.Renderer("templates"))
    if martini.Env == martini.Dev {
        m.Use(martini.Static("public"))
    }

    content := parseMarkdown("data")

    m.Get("/", func(r render.Render) {
        r.HTML(200, "index", template.HTML(content))
    })

    m.Post("/contact", form.Form(&Contact{}), func(contact *Contact) (int, string) {
        sg := sendgrid.NewSendGridClient(os.Getenv("SENDGRID_USER"), os.Getenv("SENDGRID_KEY"))
        message := sendgrid.NewMail()
        message.AddTo("florent.viel69@gmail.com")
        message.AddSubject(contact.Object)
        message.AddText(contact.Content)
        message.AddFrom(contact.From)

        r := sg.Send(message)

        if r == nil {
            return 200, "ok"
        }

        fmt.Println(r)

        return 500, "ko"
    })

    m.Run()
}

type Contact struct {
    From    string `form:"from,required"`
    Object  string `form:"object,required"`
    Content string `form:"content,required"`
}

func parseMarkdown(dir string) string {
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

    markdown := blackfriday.MarkdownBasic(content.Bytes())

    return string(markdown)
}
