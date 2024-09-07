## How to install
We need Mac OS and Brew installed. 
If Brew is not installed: 
  * Go to their web page and follow [installation instructions](https://brew.sh/)
To use git you might need to add MacOS command line tools - it will be prompted to be installed, just accept. 

```
When you see a block like this - paste it into terminal
```


1. Open terminal (Cmd + Space -> type "Terminal" -> Press Enter)

2. Install node and yarn: 

```
brew install node
brew install yarn
```

3. Clone repository
You need a good place for projects on your computer. For example, in documents folder:

```
cd ~/Documents
git clone https://github.com/nkraev/exam-booking-system.git
cd exam-booking-system
```

4. Run the app :)
We're almost there! To run the app do the following: 

```
yarn start
```

The app should be up and running. The terminal window would need to stay open (but you can collapse it, just don't close it)

## How to use
If needed, you can tweak different parts of the code - feel free to edit `src/preload.ts` file. On top of it are various delays - if you want to make app faster or slower. 
After we click through all the centers the app will sleep for 30 minutes, this can also be configured. 

It will also ask for notification permissions - please allow. 

In case something goes wrong and the app gets blocked - try force refreshing (`Cmd + Shift + R`). Or go to the terminal window you have opened and press `control + C` twice. This will kill the app, then you can type `yarn start` again to restart it. 

If you have questions - feel free to message me :)