import os, io
import base64
import json
from datetime import datetime


# a Blog structure:
# blogs = ["<blog>","<blog>"]
# tags = []
# images = []
# blog = {"Name": "<blogname>", "Creator": "<blog-creator>", "Date": "<creation-date>", "Update": "<update-date>", "Content": "<blog-content>", "Tags": tags, "Images": images}

# travers the file-tree starting in the blogroot directory
def process_file_tree_and_create_blogs():
    # directory with the blogs
    blogroot = os.environ.get('BLOGROOT')
    if len(blogroot) ==0:
        blogroot=".";
    # print("BLOGROOT --> " + blogroot)
    blogs = []
    for root, dirs, files in os.walk(blogroot, topdown = True):
        for name in files:
            # print(os.path.join(root, name))
            filename = os.path.join(root, name)
            if filename.endswith(".md"):
                # print("MD file --> " + filename)
                # print("root --> " + root)
                # print("name --> " + name)
                blog = read_mdfile_and_create_blog(filename, blogroot)
                blogs.append(blog)
    return blogs


# read content of files and send as payload to server
def read_mdfile_and_create_blog(filename, blogroot):
    blog = {}
    tags = []
    images = []

    payload=""
    try:
        f = open(filename, "r")
        for x in f:
           # print(x) 
            i=x.find("[//]: # (Name:")
            if (i >= 0):
                blog["Name"] = x[i+15:len(x)-2]
            i=x.find("[//]: # (Creator:")
            if (i >= 0):
                blog["Creator"] = x[i+18:len(x)-2]
            i=x.find("[//]: # (Date:")
            if (i >= 0):
                blog["Date"] = x[i+15:len(x)-2]
            i=x.find("[//]: # (Update:")
            if (i >= 0):
                blog["Update"] = x[i+17:len(x)-2]
            i=x.find("[//]: # (Tag:")
            if (i >= 0):
                tags=tags + [x[i+14:len(x)-2]]

            payload=payload + x

            blog["Content"] = payload;

        f.close()

        tags=tags + (filename[len(blogroot)+1:len(filename)].split(os.sep))
        tags.pop(len(tags)-1)
        # print("tags --> " + json.dumps(tags))
        blog["Tags"] = tags

    except:
        print("error with file: "+f)
            
    else:
        return blog


blogs = process_file_tree_and_create_blogs()
print(json.dumps(blogs))
