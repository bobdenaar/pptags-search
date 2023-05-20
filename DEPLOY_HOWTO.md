Initial deploy:

https://dev.to/shashannkbawa/deploying-vite-app-to-github-pages-3ane


> Add /dist folder into your repo. By running.

> `$ git add dist -f`

> -f is required, as your .gitignore will not consider your /dist folder. Hence, it is required for git to consider it as well.

> Run $ `git commit -m "Adding dist"` in your Terminal.

> Run $ `git subtree push --prefix dist origin gh-pages`


Force push to subtree:

https://stackoverflow.com/questions/33172857/how-do-i-force-a-subtree-push-to-overwrite-remote-changes
