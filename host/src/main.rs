use byteorder::{NativeEndian, WriteBytesExt};
use dbus::blocking::LocalConnection;
use dbus::tree::Factory;
use std::error::Error;
use std::io::{stdout, Write};
use std::time::Duration;

pub fn send_message(msg: &serde_json::Value) {
    let msg = serde_json::to_string(msg).unwrap();

    stdout()
        .write_u32::<NativeEndian>(msg.len() as u32)
        .unwrap();
    stdout().write_all(msg.as_bytes()).unwrap();
    stdout().flush().unwrap();
}

fn main() -> Result<(), Box<dyn Error>> {
    let connection = LocalConnection::new_session()?;

    connection.request_name(
        "org.mpris.MediaPlayer2.MprisDBusConnector",
        false,
        true,
        false,
    )?;

    let f = Factory::new_fn::<()>();

    let tree = f.tree(()).add(f.object_path("/", ()).introspectable()).add(
        f.object_path("/org/mpris/MediaPlayer2", ())
            .introspectable()
            .add(
                f.interface("org.mpris.MediaPlayer2", ())
                    .add_m(f.method("Raise", (), move |_m| {
                        let response = serde_json::json!({ "cmd": "raise" });
                        send_message(&response);

                        let mret = _m.msg.method_return().append1("");
                        Ok(vec![mret])
                    }))
                    .add_m(f.method("Quit", (), move |_m| {
                        let response = serde_json::json!({ "cmd": "quit" });
                        send_message(&response);

                        let mret = _m.msg.method_return().append1("");
                        Ok(vec![mret])
                    })),
            )
            .add(
                f.interface("org.mpris.MediaPlayer2.Player", ())
                    .add_m(f.method("Next", (), move |_m| {
                        let response = serde_json::json!({ "cmd": "next" });
                        send_message(&response);

                        let mret = _m.msg.method_return().append1("");
                        Ok(vec![mret])
                    }))
                    .add_m(f.method("OpenUri", (), move |_m| {
                        let mret = _m.msg.method_return().append1("Not Implemented");
                        Ok(vec![mret])
                    }))
                    .add_m(f.method("Pause", (), move |_m| {
                        let response = serde_json::json!({ "cmd": "pause" });
                        send_message(&response);

                        let mret = _m.msg.method_return().append1("");
                        Ok(vec![mret])
                    }))
                    .add_m(f.method("Play", (), move |_m| {
                        let response = serde_json::json!({ "cmd": "play" });
                        send_message(&response);

                        let mret = _m.msg.method_return().append1("");
                        Ok(vec![mret])
                    }))
                    .add_m(f.method("PlayPause", (), move |_m| {
                        let response = serde_json::json!({ "cmd": "playpause" });
                        send_message(&response);

                        let mret = _m.msg.method_return().append1("");
                        Ok(vec![mret])
                    }))
                    .add_m(f.method("Previous", (), move |_m| {
                        let response = serde_json::json!({ "cmd": "previous" });
                        send_message(&response);

                        let mret = _m.msg.method_return().append1("");
                        Ok(vec![mret])
                    }))
                    .add_m(
                        f.method("Seek", (), move |m| {
                            let seek: i64 = m.msg.read1()?;
                            let response = serde_json::json!({ "cmd": "seek", "seek": seek });
                            send_message(&response);

                            Ok(vec![])
                        })
                        .inarg::<&i64, _>("Offset"),
                    )
                    .add_m(f.method("SetPosition", (), move |_m| {
                        let mret = _m.msg.method_return().append1("Not Implemented");
                        Ok(vec![mret])
                    }))
                    .add_m(f.method("Stop", (), move |_m| {
                        let response = serde_json::json!({ "cmd": "stop" });
                        send_message(&response);

                        let mret = _m.msg.method_return().append1("");
                        Ok(vec![mret])
                    })),
            ),
    );

    tree.start_receive(&connection);
    loop {
        connection.process(Duration::from_millis(1000))?;
    }
}
