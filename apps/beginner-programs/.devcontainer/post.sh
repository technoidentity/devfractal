sclone() {
    local dest=${*: -1}
    [ -d "$dest" ] && return
    git clone --depth=1 "$@"
}

[ -d $HOME/.oh-my-zsh ] || sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

sclone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
sclone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

sclone https://github.com/spaceship-prompt/spaceship-prompt.git "$HOME/.spaceship-prompt"
ln -s "$HOME/.spaceship-prompt/spaceship.zsh-theme" ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/spaceship.zsh-theme

git config pull.rebase true
git config --global core.autocrlf true

cp .devcontainer/.zshrc $HOME

pnpm install
