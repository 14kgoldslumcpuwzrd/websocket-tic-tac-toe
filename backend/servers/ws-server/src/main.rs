// use std::net::TcpListener;
// use std::thread::spawn;
// use tungstenite::accept;

// // 127.0.0.1:9001

// /// A WebSocket echo server
// fn main () {
//     let server = TcpListener::bind("localhost:4201").unwrap();
//     for stream in server.incoming() {
//         spawn (move || {
//             let mut websocket = accept(stream.unwrap()).unwrap();
//             loop {
//                 let msg = websocket.read_message().unwrap();

//                 // We do not want to send back ping/pong messages.
//                 if msg.is_binary() || msg.is_text() {
//                     websocket.write_message(msg).unwrap();
//                 }
//             }
//         });
//     }
// }

use actix::{Actor, StreamHandler};
use actix_web::{web, App, Error, HttpRequest, HttpResponse, HttpServer};
use actix_web_actors::ws;

struct WSServer;

impl Actor for WSServer {
    type Context = ws::WebsocketContext<Self>;
}

//Handler for ws::Message message
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for WSServer {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Ping(msg)) => {
                ctx.pong(&msg);
                println!("PONGING DUDE!!!");
            },   
            Ok(ws::Message::Text(text)) => {
                println!("TEXT WAS RECEIVED: {}", &text);
                ctx.text(text);
            },
            Ok(ws::Message::Binary(bin)) => ctx.binary(bin),
            _ => (),
        }
        println!()
    }
}

async fn index(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let resp = ws::start(WSServer {}, &req, stream);
    println!("{:?}", resp);
    resp
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/", web::get().to(index)))
        .bind(("localhost", 4201))?
        .run()
        .await
}