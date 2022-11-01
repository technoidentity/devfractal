export ZSH=$HOME/.oh-my-zsh

SPACESHIP_NODE_SHOW=false
SPACESHIP_GIT_SYMBOL=""
SPACESHIP_PACKAGE_SHOW=false

ZSH_THEME="spaceship"

plugins=(
    dirhistory
    git
    fasd
    git
    fzf
    command-not-found
    alias-finder
    common-aliases
    sudo
    cp
    zsh-syntax-highlighting
    zsh-autosuggestions
)

source $ZSH/oh-my-zsh.sh

DISABLE_AUTO_UPDATE=true
DISABLE_UPDATE_PROMPT=true

alias g='git'
alias gst="git status"
alias gsu="git status -u"
alias gcan="git commit --amend --no-edit"
alias gsa='git stash apply'
alias gfm='git pull'
alias gp='git push'
alias gcm='git commit --message'
alias gia='git add'
alias gl='git log --topo-order --pretty=format:"$_git_log_medium_format"'
alias gco='git checkout'
alias gb='git branch'
alias gbc='git checkout -b'
alias gbc='git checkout -b'
alias gsl='git stash list'

alias n='pnpm'
alias ni='pnpm install'
alias ne='pnpm exec'
alias nd='pnpm dev'
alias nt='pnpm types'
alias nc='pnpm ci'
alias ntt='pnpm test'
alias ntt='pnpm test'
