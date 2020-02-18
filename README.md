# mpris-dbus-connector

## Overview

#### Permissions:
- tabs (***Access browser tabs***) - store player tabId - needed to send message from background to content script
- menus - create context menu item
- nativeMessaging (***Exchange messages with programs other than Firefox***) - communication between the host application and extension

## Install

### Host application

TODO

### Add-on

Currently not released on AMO.
TODO

## Deployment

Create zip

```
$ zip -r -FS mpris-dbus-connector.zip manifest.json src
```