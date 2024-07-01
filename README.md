# gruvbox-startpage
![image](https://github.com/tiz314/gruvbox-startpage/assets/63679072/4e1d3402-f52b-48b9-86fb-6e3be398b56b)

A **gruvbox-dark** themed **startpage**

For some gruvbox themed wallpapers, check [this](https://github.com/AngelJumbo/gruvbox-wallpapers)

## Usage

Just clone this repo, modify the index as you prefer, add your hostname (purely aesthetic) and modify your favourite links and/or services. Then, create the docker container by using `docker compose up -d`

## Wallpapers

Wallpapers need to be named with numbers (starting from 1) and can be either pngs or jpgs (for more formats, the source code needs to be changed).


In order for the rotation to properly work, you need to add the total number of pngs or jpgs inside the `setBackground()` function (variables `num_pngs` and `num_jpgs`) and also modify the `dark_mode_indexes` array with the indexes of the wallpapers that need dark mode to be activated.
If you want the lower part of the start page to be lighter when using dark mode with some particular images, just pass `true` to `switchToDarkMode()` if the desired index is picked.
