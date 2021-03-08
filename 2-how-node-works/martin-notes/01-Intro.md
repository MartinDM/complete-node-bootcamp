# Intro

Javascript runtime
Built on V8 engine
Container for running JS without the browser - V8 engine parses and runs it.
JS on the server side as doesn't require a browser.
Non-blocking model.
Single-threaded, I/O, event-driven.

## Ideal for
- Real-time apps
- I/O apps
- API and DB
- Media streaming

## Not ideal for
- Heavy server-side processing

## Event Driven Architecture
- Using 'Server' is an instance of `EventEmitter` class
- Observer pattern reacts to events emitted, rather than nested calling of functions
- Event Emitter > [Emits events] > Event listener runs a callback function

