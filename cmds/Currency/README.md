# The Guiding Lanterns
## Adding items guideline (or propose modifications)

[![Discord](https://img.shields.io/discord/570024448371982373)](https://discord.gg/5QCQpr9)

---

## If you want to add your items (or to suggest some changes), please follow these steps:

### 1. Before starting, Please note there steps:
- The main file to edit is [the cur.json file](cur.json)
- Add or change items only in "item" section
- Please do not abuse in prize of your item (example: A fishing rod does not cost > 100 000 G$)
- To add an item, respect the lines well (it must be clear to everyone).
- Please respect the values, of course, the Numbers remain the Numbers and strings as they are

### 2. Item guideline:

**IMPORTANT! The lines to copy and paste and put them last!, then modify them**

The lines to copy and paste are (an example):
```json
,{
            "name": "🍳 Frying pan",
            "cost": 500,
            "sell": 250,
            "use": [
                {
                    "text": "Ouch 🤕",
                    "img": "https://media.giphy.com/media/xjHj7TPdbCN8I/giphy.gif"
                }
                ,{
                    "text": "You hit yourself, ouch... 🤕",
                    "img": "https://media.giphy.com/media/W5yshKbH5wrwA/giphy.gif"
                }
                ,{
                    "text": "Don't distrub me!",
                    "img": "https://media.giphy.com/media/453uXLWE9u6u4/giphy.gif"
                }
            ]
        }
```
Then, modify the lines as you wish

### 3. Submitting:
- To send, please create a branch and then a pull request to "master".
### **Once your item request has been verified and sent, the bot will automatically add them within 24 hours and you can enjoy them.**
