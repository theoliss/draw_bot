valid_head = ["<rect","<path","<line","<circle"]

def trad_rect(input : str) -> str:
    coef = 10
    width = input[input.find('width="'):]
    width = float(width[7:width.find('"', 7)])*coef
    height = input[input.find('height='):]
    height = float(height[8:height.find('"', 8)])*coef
    x = input[input.find('x="'):]
    x = float(x[3:x.find('"', 3)])*coef
    y = input[input.find('y="'):]
    y = float(y[3:y.find('"', 3)])*coef
    
    output = 'move_pen_abs(' + "%.2f" % x + ',' + "%.2f" % y + ');\n'
    output += 'draw_line(0,0,' + "%.2f" % width + ',0);\n'
    output += 'draw_line(0,0,0,' + "%.2f" % height + ');\n'
    output += 'draw_line(0,0,' + "%.2f" % -width + ',0);\n'
    output += 'draw_line(0,0,0,' + "%.2f" % -height + ');\n'
    return output



if __name__ == "__main__":

    #input a file:
    file_name = "loss" #input("whats is the name of the file ?\n")
    if file_name[-4:] != ".svg" :
        file_name += ".svg"

    #open the file and start the traduction:
    with open(file_name,'r') as picture :
        all_doc = "".join(picture.readlines())
        description = []

    #clean the file and extract only the usefull datas:
    for i in range(len(all_doc)) :
        all_doc = all_doc.replace(" ","")
        all_doc = all_doc.replace("\t","")
        all_doc = all_doc.replace("\n","")

    count = 0
    memo = "" 
    while(count < len(all_doc)):
        char = all_doc[count]
        memo += char
        if char == '>':
            if any([memo.find(i) == 0 for i in valid_head]):
                description.append(memo)
            memo = ""
        count += 1

    #call the trad funtion for each type of supported object:
    with open("draw.txt", "w") as output:
        for line in description:
            index = [line.find(i) == 0 for i in valid_head].index(1)
            match index:
                case 0: #it is a rect
                    to_write = trad_rect(line)
                    output.write(to_write)
        output.write("endfile();")
    
    
