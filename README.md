# React Music Player

Ein moderner Musik- und Videoplayer auf Basis von [ReactPlayer](https://github.com/cookpete/react-player).

Das Projekt ermöglicht es, viele verschiedene unterstützte Links, unter anderem von YouTube, direkt im Player abzuspielen. Zusätzlich können komplette Playlists gespeichert und eigene Playlists erstellt und verwaltet werden.

## Features

* 🎵 Wiedergabe vieler unterstützter URLs
* ▶️ YouTube-Unterstützung
* 📋 Speichern kompletter Playlists
* ➕ Erstellen eigener Playlists
* 🗂️ Songs innerhalb von Playlists verwalten
* ☑️ Mehrere Songs auswählen
* 🖱️ Ausgewählte Songs per Drag & Drop verschieben oder kopieren
* 🔀 Shuffle-Modus
* 🔁 Loop-Modus
* 🔊 Lautstärkeregelung
* ⏩ Anpassbare Wiedergabegeschwindigkeit
* ⏮️ Vorheriger und ⏭️ nächster Song
* 💾 Speicherung der Playlists im Local Storage
* 📊 Anzeige des aktuellen Wiedergabefortschritts

## Technologie

Das Projekt wurde mit folgenden Technologien entwickelt:

* **React**
* **TypeScript / JavaScript**
* **ReactPlayer**
* **React Context API**
* **Local Storage**
* **CSS**

### ReactPlayer

Die Wiedergabe basiert auf [ReactPlayer](https://github.com/cookpete/react-player), wodurch verschiedene Medienquellen und Plattformen unterstützt werden können.

Die tatsächlich unterstützten URLs hängen dabei von den von ReactPlayer unterstützten Providern ab.

## Playlists

Der Player unterstützt zwei Arten von Playlists.

### Gespeicherte Playlists

Playlists können gespeichert und später wieder aufgerufen werden. Die enthaltenen Songs werden dabei lokal im Browser gespeichert.

### Eigene Playlists

Zusätzlich können eigene Playlists erstellt werden. Songs können zwischen Playlists verschoben oder kopiert werden.

Mehrere Songs können gleichzeitig ausgewählt und anschließend per Drag & Drop übertragen werden.

## Drag & Drop

Songs können innerhalb einer Playlist per Drag & Drop neu angeordnet werden.

Durch die Mehrfachauswahl können außerdem mehrere Songs gleichzeitig verschoben oder in eine andere Playlist kopiert werden.

Die Auswahl basiert auf den IDs der Songs. Dadurch wird beim Drag & Drop nur die tatsächlich ausgewählte Teilmenge übertragen und nicht die komplette Playlist.

## Speicherung

Die Playlists werden über den **Local Storage** des Browsers gespeichert.

Dadurch bleiben gespeicherte Playlists auch nach einem Neustart der Anwendung erhalten.

Die Daten sind allerdings an den jeweiligen Browser bzw. das verwendete Gerät gebunden und werden nicht mit einem Server synchronisiert.

## Projektstruktur

Die Anwendung ist in verschiedene Komponenten und Contexts aufgeteilt.

Beispielsweise übernehmen die Contexts die Verwaltung von:

* Player-Status
* Playlists
* gespeicherten Playlist-Daten

Die UI ist in kleinere React-Komponenten aufgeteilt, damit Player-Steuerung, Playlist-Anzeige und Playlist-Verwaltung voneinander getrennt bleiben.

## Hinweis zu unterstützten Links

Nicht jeder Link kann automatisch abgespielt werden.

Die unterstützten Quellen werden durch die von ReactPlayer bereitgestellten Provider bestimmt. Insbesondere bei Plattformen wie YouTube können sich technische Einschränkungen oder Änderungen der Plattform auf die Wiedergabe auswirken.

## Ziel des Projekts

Das Projekt entstand als eigenes React-Projekt, um den Umgang mit React-Komponenten, Context API, State Management, Local Storage, Drag & Drop und der Integration einer externen Player-Bibliothek praktisch umzusetzen.

Der Fokus liegt dabei auf einem eigenen, erweiterbaren Player mit Playlist-Verwaltung statt auf der vollständigen Nachbildung eines bestehenden Streaming-Dienstes.
