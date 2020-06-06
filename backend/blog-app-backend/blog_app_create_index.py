import os, io
import base64
import json
from datetime import datetime
import uuid

templatename="template.html"

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
#    print("BLOGROOT --> " + blogroot)
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
            i=x.find("[//]: # (Description:")    
            if (i >= 0):
                blog["Description"] = x[i+22:len(x)-2]
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

            # blog["Content"] = payload;
        
        f.close()

#        tags=tags + (filename[len(blogroot)+1:len(filename)].split(os.sep))
#        tags.pop(len(tags)-1)
        # print("tags --> " + json.dumps(tags))
        blog["Tags"] = tags

        blog["UUID"] = str(uuid.uuid5(uuid.NAMESPACE_DNS, blog["Name"]+blog["Creator"]+blog["Date"]))
        link = filename[len(blogroot)+1:len(filename)]
        linklist=link.split(os.sep)
        url=""
        for y in linklist:
            url=url+"/"+y
#        print ("link --> " + link)
        blog["URL"] = url

    except:
        print("error with file: "+f)
            
    else:
        return blog


def produce_loop(blogs):
    bl_string=""
    for bl in blogs:
        tagstring=""
        for t in bl["Tags"]:
            tagstring=tagstring+"#"+t+" "
        bl_string=bl_string+"\n"
        bl_string=bl_string+"  <div  class=\"list-group-item list-group-item-action flex-column align-items-start\">\n"
        bl_string=bl_string+"    <div class=\"d-flex w-100 justify-content-between\">\n"
        bl_string=bl_string+"      <h5 class=\"mb-1\">"+ bl["Name"] +"</h5>\n"
        bl_string=bl_string+"      <small>Updated: " + bl["Update"] + "</small>\n"
        bl_string=bl_string+"    </div>\n"        		
        bl_string=bl_string+"    <p class=\"mb-1\">"+ bl["Description"] +"</p>\n"
        bl_string=bl_string+"    <small>" + tagstring + "</small>\n"
        bl_string=bl_string+"    <small><a class=\"nav-link invisible\" href=\"assets" + bl["URL"] +"\">read more ...</a></small>\n"
        bl_string=bl_string+"    <small><a class=\"nav-link\" href=\"#/markdownshow?prop=" + bl["UUID"] +"\">read more ...</a></small>\n"
        bl_string=bl_string+"  </div>\n"		
        bl_string=bl_string+"\n"

#    print("====>")
#    print(bl_string)
#    print("<====")
    return bl_string	

def produce_tags(blogs):
    atags=[]
    tagstring="\n" 
    for bl in blogs:
        bltags=bl["Tags"]
        for t in bltags:
            if t in atags:
                "do nothing"
            else:
                atags=atags+[t]
    
    for at in atags:
        tagstring=tagstring+"  <meta name=\"keywords\" content=\"" + at + "\">\n" 
    tagstring=tagstring+"\n"        
    return tagstring    


def read_template(tfilename, blogs):
    tstring=""
    try:
        fi = open(tfilename, "r")
        for x in fi:
            i=x.find("#####")
            j=x.find("*****")
            if (i >= 0):
                tstring=tstring+produce_loop(blogs)
            elif (j>=0):
                 tstring=tstring+produce_tags(blogs)
            else:
                tstring=tstring+x		
        fi.close()
    except:
        print("error with file: "+fi)
            
    else:
        return tstring		


def main():
    blogs = process_file_tree_and_create_blogs()
#    print("\n\n")	
#    print(blogs)
    templ=read_template(templatename, blogs);
    print(templ)

if __name__ == "__main__":
    main()



