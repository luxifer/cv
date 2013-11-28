package main

import (
    "github.com/codegangsta/martini"
    "github.com/codegangsta/martini-contrib/render"
)

func main() {
    m := martini.Classic()
    m.Use(render.Renderer("templates"))
    m.Use(martini.Static("public"))

    m.Get("/", func(r render.Render) {
        r.HTML(200, "index", nil)
    })
    m.Run()
}
