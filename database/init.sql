DROP TABLE IF EXISTS visitas;

CREATE TABLE visitas (

id INTEGER PRIMARY KEY AUTOINCREMENT,

ip TEXT,

fecha TEXT,

hora TEXT,

pais TEXT,

ciudad TEXT,

isp TEXT,

navegador TEXT,

sistema TEXT,

dispositivo TEXT,

idioma TEXT,

pagina TEXT,

referer TEXT

);

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios(

id INTEGER PRIMARY KEY AUTOINCREMENT,

usuario TEXT UNIQUE,

password TEXT

);