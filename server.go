package main

import (
    "bytes"
    "github.com/codegangsta/martini"
    "github.com/codegangsta/martini-contrib/render"
    "github.com/russross/blackfriday"
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

    m.Run()
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
