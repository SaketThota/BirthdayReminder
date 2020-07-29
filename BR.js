const Add = document.querySelector(".add"),
    Name = document.querySelector("#name"),
    Birthdate = document.querySelector("#birthdate"),
    List = document.querySelector(".list");
    
let Names = [],months = [31,28,31,30,31,30,31,31,30,31,30,31];

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    
    let h1=document.createElement('th'),
        h2=document.createElement('th'),
        h3 = document.createElement('th'),
        tr = document.createElement('tr');
    
    h1.textContent="No.";
    h2.textContent="Name";
    h3.textContent="Birthday In";
    
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
        var mn1 = parseInt(a.date.substring(5,7)); 
        var mn2 = parseInt(b.date.substring(5,7));
        var d1 = parseInt(a.date.substring(8));
        var d2 = parseInt(b.date.substring(8));
        if(mn1!=mn2){
            if(mn1<mn2) return -1;
            else return 1;
        }
        else{
            if(d1<d2) return -1;
            else return 1;
        }
    });

    removeAllChildNodes(List);   

    let cnt = 1;
    
    Names.forEach(function(ele){
        let curr = new Date(),
            currDate = curr.getDate(),
            currMonth = curr.getMonth();
        
        let newbirthday = document.createElement('tr');
        newbirthday.className="list-items";
        let newname = document.createElement('td');
        let newdate = document.createElement('td');
        let sr = document.createElement('td');
        sr.className = "list-items-name";
        newname.className = "list-items-name";
        newdate.className = "list-items-date";
        
        let completeDate = ele.date;
        // 2020-07-02
        let birthdayMonth = parseInt(completeDate.substring(5, 7)),
            birthdayDate = parseInt(completeDate.substring(8, 10));
        birthdayMonth--;
        
        var days = 0;
        if (currMonth == birthdayMonth) {
            days += Math.abs(currDate - birthdayDate);
        } else { 
            days += Math.abs(months[currMonth] - currDate);
            currMonth++;
            while (currMonth < birthdayMonth) { 
                days += Math.abs(months[currMonth]);
            }
            days += Math.abs(birthdayDate);
        }

        sr.textContent = cnt++;
        newname.textContent = ele.name;
        newdate.textContent = "In " + days + " Days";
        newbirthday.appendChild(sr);
        newbirthday.appendChild(newname);
        newbirthday.appendChild(newdate);
        if (newname.textContent && newdate.textContent)
            List.appendChild(newbirthday);
    })    
}