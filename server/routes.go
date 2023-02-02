package main

import (
	"github.com/gin-gonic/gin"
)

type PostSchema struct {
	Title   string
	Content string
}

type CommentSchema struct {
	Content string
}

func (a *App) GetCurrentUser(ctx *gin.Context) *User {
	session, err := ctx.Cookie("token")
	if err != nil {
		ctx.JSON(401, gin.H{"error": "Invalid token"})
		return nil
	}

	var sessions []Sessions
	a.DB.Find(&sessions, "token = ?", session)

	if len(sessions) == 0 {
		ctx.JSON(401, gin.H{"error": "Invalid token"})
		return nil
	}

	var user User
	a.DB.First(&user, sessions[0].UserID)

	return &user
}

func (a *App) CreatePost(ctx *gin.Context) {
	user := a.GetCurrentUser(ctx)
	if user == nil {
		return
	}

	var post PostSchema
	ctx.BindJSON(&post)

	a.DB.Create(&post)

	ctx.JSON(200, post)
}

func (a *App) GetPosts(ctx *gin.Context) {
	var posts []Post
	a.DB.Find(&posts)

	ctx.JSON(200, posts)
}

func (a *App) GetPost(ctx *gin.Context) {
	user := a.GetCurrentUser(ctx)
	if user == nil {
		return
	}

	var post Post
	a.DB.First(&post, ctx.Param("id"))

	ctx.JSON(200, post)
}

func (a *App) UpdatePost(ctx *gin.Context) {
	user := a.GetCurrentUser(ctx)
	if user == nil {
		return
	}

	var post Post
	a.DB.First(&post, ctx.Param("id"))

	ctx.BindJSON(&post)
	a.DB.Save(&post)

	ctx.JSON(200, post)
}

func (a *App) DeletePost(ctx *gin.Context) {
	user := a.GetCurrentUser(ctx)
	if user == nil {
		return
	}

	var post Post
	a.DB.First(&post, ctx.Param("id"))

	a.DB.Delete(&post)

	ctx.Status(200)
}

func (a *App) GetPostComments(ctx *gin.Context) {
	user := a.GetCurrentUser(ctx)
	if user == nil {
		return
	}

	var post Post
	a.DB.First(&post, ctx.Param("id"))

	var comments []Comment
	a.DB.Model(&post).Association("Comments").Find(&comments)

	ctx.JSON(200, comments)
}

func (a *App) CreatePostComment(ctx *gin.Context) {
	user := a.GetCurrentUser(ctx)
	if user == nil {
		return
	}

	var comment CommentSchema
	ctx.BindJSON(&comment)

	var post Post
	a.DB.First(&post, ctx.Param("id"))

	a.DB.Model(&post).Association("Comments").Append(&comment)

	ctx.JSON(200, comment)
}

func (a *App) GetPostComment(ctx *gin.Context) {
	user := a.GetCurrentUser(ctx)
	if user == nil {
		return
	}

	var comment Comment
	a.DB.First(&comment, ctx.Param("comment_id"))

	ctx.JSON(200, comment)
}
