const Add = document.querySelector(".add"),
    Name = document.querySelector("#name"),
    Birthdate = document.querySelector("#birthdate"),
    List = document.querySelector(".list");
    
let Names = [];

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    
        let h1=document.createElement('th'),
            h2=document.createElement('th'),
            h3=document.createElement('th');
        h1.textContent="No.";
        h2.textContent="Name";
        h3.textContent="Birthday In";
        let tr = document.createElement('tr');
        
        tr.appendChild(h1);
        tr.appendChild(h2);
        tr.appendChild(h3);
        parent.appendChild(tr);
    
}

Add.addEventListener('click',function(){
    let temp = {name:"",date:""};
    temp.name = Name.value;
    temp.date = Birthdate.value;
    Names.push(temp);
    showTable();
});

function showTable(){        
    let sz = Names.length;
    Names.sort(function(a,b){
        var mn1 = parseInt(a.date.substring(5,7)); // yyyy-mm-dd
        var mn2 = parseInt(b.date.substring(5,7));
        var d1 = parseInt(a.date.substring(8));
        var d2 = parseInt(b.date.substring(8));
        if(mn1!=mn2){
            if(mn1<mn2)return -1;
            else{
              return 1;
            }
        }
        else{
            if(d1<d2)return -1;
            else return 1;
        }
    });
    let cnt = 1;
    removeAllChildNodes(List);    

    Names.forEach(function(ele){
            let newbirthday = document.createElement('tr');
            newbirthday.className="list-items";
            let newname = document.createElement('td');
            let newdate = document.createElement('td');
            let sr = document.createElement('td');
            sr.className="list-items-name";
            newname.className="list-items-name";
            newdate.className="list-items-date";
            
            sr.textContent=cnt++;
            newdate.textContent=ele.date;
            newname.textContent=ele.name;
            newbirthday.appendChild(sr);
            newbirthday.appendChild(newname);
            newbirthday.appendChild(newdate);
            console.log(newbirthday);
            console.log(newname);
            if(newname.textContent && newdate.textContent) List.appendChild(newbirthday);
        
    })    
    
}
