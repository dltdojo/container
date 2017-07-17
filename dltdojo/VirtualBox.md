# VirtualBox虛擬裝置(ova檔案)

S與W的差別在於VM關機後S的檔案系無法存取W的可以，不過W因為Windows系統限制目前Docker/Nodejs支援程度不佳，故以S為主要開發方式。

## 如何使用DLDOJO-S1虛擬裝置(ova檔案)

* 下載DLTDOJO ova檔案
* 開啟VirtualBox - 檔案 - 匯入應用裝置
* 修改名稱與虛擬磁碟映像為實際本機有效位置
* 勾選初始化網卡MAC位址
* 匯入
* 啟動
* dltdojo/dltdojo登入
* ifconfig查IP地址(非docker0)

### DLTDOJO S1 Virtual Device

* Name: DLTDOJO-S1
* Base: DLTDOJO-B2
* OVA size: 1.2 GiB
* OVA link: http://dltdojo.org/vbvm/dltdojo-s1.ova
* OS: Ubuntu 16.04 Server
* RAM: 4 GiB
* HD: 50 GiB
* Network: 橋接介面卡
* Username: dltdojo
* Password: dltdojo
* IP address: login, ifconfig
* smb資料夾: /home/dltdojo/smb
* 預設共用資料密碼: dltdojo
* Windows Url: \\<VM_IP_ADDRESS>\smb
* nodejs version: 6.11.1
* docker version: 17.06.0-ce
* docker-compose: 1.8.0

### DLTDOJO S1 Virtual Device

* https://help.ubuntu.com/community/How%20to%20Create%20a%20Network%20Share%20Via%20Samba%20Via%20CLI%20%28Command-line%20interface/Linux%20Terminal%29%20-%20Uncomplicated%2C%20Simple%20and%20Brief%20Way%21

```
$ sudo apt-get install -y build-essential tree samba
$ sudo apt-get remove nodejs
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install nodejs
$ sudo smbpasswd -a dltdojo
$ mkdir /home/dltdojo/smb
$ sudo cp /etc/samba/smb.conf ~
$ sudo nano /etc/samba/smb.conf

[smb]
path = /home/dltdojo/smb
valid users = dltdojo
read only = no

$ sudo service smbd restart
```

## 如何匯入DLDOJO-W1虛擬裝置(ova檔案)

* 下載DLTDOJO ova檔案
* 開啟VirtualBox - 檔案 - 匯入應用裝置
* 選擇下載ova檔案
* 修改名稱
* 修改虛擬磁碟映像為實際本機有效位置
* 勾選初始化網卡MAC位址
* 匯入
* 如有共用資料夾路徑到設定修改本機實際路徑，注意資料夾名稱必須是w1share綁定不要更改。

## DLTDOJO W1 Virtual Device

Windows Host with Guest Additions

* Name: DLTDOJO-W1
* Base: DLTDOJO-B2
* OVA size: 1.1 GiB
* OVA link: http://dltdojo.org/vbvm/dltdojo-w1.ova
* OS: Ubuntu 16.04 Server
* RAM: 4 GiB
* HD: 50 GiB
* Network: 橋接介面卡
* Username: dltdojo
* Password: dltdojo
* IP address: login, ifconfig
* 共用資料夾名稱(綁定掛載不能更改): w1share

#### Install Guest Additions

裝置 >  插入 Guest Additions CD 映像...

```
$ sudo mount /dev/cdrom /media/cdrom
mount: /dev/sr0 is write-protected, mounting read-only
$ sudo apt-get install make gcc linux-headers-$(uname -r)
$ sudo /media/cdrom/VBoxLinuxAdditions.run
$ sudo nano /etc/fstab

w1share /home/dltdojo/w1share vboxsf defaults,_netdev 0 0
$ sudo reboot
$ ls -al ~/w1share
```

## DLTDOJO B2 Virtual Device

* Name: DLTDOJO-B2
* OVA size: 1 GiB
* OVA link: http://dltdojo.org/vbvm/dltdojo-b2.ova
* OS: Ubuntu 16.04 Server
* RAM: 4 GiB
* HD: 50 GiB
* Network: 橋接介面卡
* Username: dltdojo
* Password: dltdojo
* IP address: login, ifconfig

#### Install Docker and Nodejs

```
$ sudo apt-get update
$ sudo apt-get install -y apt-transport-https ca-certificates curl git jq software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
$ sudo apt-get update && sudo apt-get install -y docker-ce docker-compose
$ sudo usermod -aG docker $USER
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
dltdojo@dltdojo:~$ docker version
Client:
 Version:      17.06.0-ce
 API version:  1.30
 Go version:   go1.8.3
 Git commit:   02c1d87
 Built:        Fri Jun 23 21:23:31 2017
 OS/Arch:      linux/amd64
dltdojo@dltdojo:~$ docker-compose version
docker-compose version 1.8.0, build unknown
docker-py version: 1.9.0
CPython version: 2.7.12
OpenSSL version: OpenSSL 1.0.2g  1 Mar 2016
dltdojo@dltdojo:~$ node -v
v8.1.3
dltdojo@dltdojo:~$ npm -v
5.0.3
```