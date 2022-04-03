//! Simple echo websocket server.
//!
//! Open `http://localhost:8080/` in browser to test.

use actix_files::NamedFile;
use actix_web::{middleware, web, App, Error, HttpRequest, HttpResponse, HttpServer, Responder};
use actix_web_actors::ws;

mod server;
use self::server::MyWebSocket;

async fn index() -> impl Responder {
    NamedFile::open_async("../frontend/index.html").await.unwrap()
}

async fn styles() -> impl Responder {
    NamedFile::open_async("../frontend/styles.css").await.unwrap()
}

async fn js() -> impl Responder {
    NamedFile::open_async("../frontend/main.js").await.unwrap()
}

async fn intermedium() -> impl Responder {
    NamedFile::open_async("../frontend/resources/inter/static/Inter-Medium.ttf").await.unwrap()
}

/// WebSocket handshake and start `MyWebSocket` actor.
async fn echo_ws(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    ws::start(MyWebSocket::new(), &req, stream)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    log::info!("starting HTTP server at http://localhost:8080");

    HttpServer::new(|| {
        App::new()
            // WebSocket UI HTML file
            .service(web::resource("/").to(index))
            // CSS 
            .service(web::resource("/styles.css").to(styles))
            // resources
            .service(web::resource("/Inter-Medium.ttf").to(intermedium))
            .service(web::resource("/Inter-"))
            // js
            .service(web::resource("/main.js").to(js))
            // websocket route
            .service(web::resource("/ws").route(web::get().to(echo_ws)))
            // enable logger
            .wrap(middleware::Logger::default())
    })
    .workers(2)
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}