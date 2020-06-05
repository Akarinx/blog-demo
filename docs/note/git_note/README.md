# git 命令

## git config --global user.name/user.email

添加账号

`git config --global user.name ''`

`git config --global user.email ''`

## git init

对当前目录进行初始化，建立暂存区

## git add

- `git add + 文件名` 提交单个文件
- `git add *`提交目录下所有文件
- `git commit -m '描述'` 每次提交后都需要加上个描述

## git status

查看当前状态

## git checkout

将暂存区文件恢复到工作区

`git checkout + 文件名`

## git diff

查看工作区与暂存区的版本区别
::: tip
没区别的时候不会显示内容
:::

## git reset --hard

`git reset --hard +版本号` 将版本恢复到对应版本号的内容

## git log

`git log`查看过去版本信息

## git push

将暂存区内容上传

## git clone

克隆他人仓库，从无到有

## git pull

将仓库直接拉下，本地本身就有，即更新仓库
