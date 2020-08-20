# mpris-dbus-connector

## Overview

#### Permissions:

- tabs (**_Access browser tabs_**) - store player tabId - needed to send message from background to content script
- menus - create context menu item
- nativeMessaging (**_Exchange messages with programs other than Firefox_**) - communication between the host application and extension

## Install

### Host application

#### Linux, MacOS, BSD

TODO

### Add-on

Currently not released on AMO.
TODO

## Deployment

Create zip

```
$ zip -r -FS mpris-dbus-connector.zip manifest.json src
```
