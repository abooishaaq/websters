package main

import (
	"crypto/rand"
	"math/big"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserId   uint
	Username string
	Password string
	Posts    []Post     `gorm:"foreignKey:UserID"`
	Comments []Comment  `gorm:"foreignKey:UserID"`
	Sessions []Sessions `gorm:"foreignKey:UserID"`
}

type Post struct {
	gorm.Model
	PostId   uint
	Title    string
	Content  string
	UserID   uint
	Comments []Comment `gorm:"foreignKey:PostID"`
}

type Comment struct {
	gorm.Model
	CommentId uint
	Content   string
	UserID    uint
	PostID    uint
}

type Sessions struct {
	gorm.Model
	Token  string
	UserID uint
}

type UserSchema struct {
	Username string
	Password string
}

func generateToken() string {
	token := make([]rune, 16)
	for i := range token {
		r, _ := rand.Int(rand.Reader, big.NewInt(26))
		token[i] = rune(r.Int64() + 65)
	}
	return string(token)
}

func (a *App) Login(ctx *gin.Context) {
	var user UserSchema
	ctx.BindJSON(&user)

	var dbUser User
	a.DB.Where("username = ?", user.Username).First(&dbUser)

	err := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))

	if err != nil {
		ctx.JSON(401, gin.H{"error": "Invalid credentials"})
		return
	}

	strtoken := generateToken()

	sess := Sessions{
		Token:  strtoken,
		UserID: dbUser.UserId,
	}
	a.DB.Create(&sess)

	ctx.JSON(200, gin.H{"token": strtoken})
}

func (a *App) Register(ctx *gin.Context) {
	var user UserSchema
	ctx.BindJSON(&user)

	var dbUser User
	a.DB.Where("username = ?", user.Username).First(&dbUser)

	if dbUser.Username != "" {
		ctx.JSON(400, gin.H{"error": "Username already exists"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		ctx.JSON(500, gin.H{"error": "Error while hashing password"})
		return
	}

	hashed := string(hash)

	a.DB.Create(&User{
		Username: user.Username,
		Password: hashed,
	})

	ctx.Status(200)
}

func (a *App) InitializeRoutes() {
	// CORS enable
	a.Router.Use(func(ctx *gin.Context) {
		ctx.Header("Access-Control-Allow-Origin", "*")
		ctx.Header("Access-Control-Allow-Credentials", "true")
		ctx.Header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, UPDATE")
		ctx.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, client-security-token")
		ctx.Header("Access-Control-Expose-Headers", "Content-Length")
		ctx.Header("Access-Control-Max-Age", "86400")

		if ctx.Request.Method == "OPTIONS" {
			ctx.AbortWithStatus(200)
		}

		ctx.Next()
	})
	a.Router.POST("/api/login", a.Login)
	a.Router.POST("/api/register", a.Register)
	a.Router.GET("/api/posts", a.GetPosts)
	a.Router.GET("/api/posts/:id", a.GetPost)
	a.Router.POST("/api/posts", a.CreatePost)
	a.Router.GET("/api/posts/:id/comments", a.GetPostComments)
	a.Router.POST("/api/posts/:id/comments", a.CreatePostComment)
	a.Router.GET("/api/comments/:comment_id", a.GetPostComments)
	a.Router.Run()
}

func main() {
	db, err := gorm.Open(sqlite.Open("db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&User{}, &Post{}, &Comment{}, &Sessions{})

	app := App{
		Router: gin.Default(),
		DB:     db,
	}

	app.InitializeRoutes()
}
