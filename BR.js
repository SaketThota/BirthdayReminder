const Add = document.querySelector(".add"),
    Remove = document.querySelector(".remove"),
    Name = document.querySelector("#name"),
    Birthdate = document.querySelector("#birthdate"),
    List = document.querySelector(".list");
 let List_items = document.querySelectorAll(".list-items");
    // 1 heading
    // 2 sr name
    
let Names = [],months = [31,28,31,30,31,30,31,31,30,31,30,31];
let selected = NaN;



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
    if(Name.value && Birthdate.value){
    temp.name = Name.value;
    temp.date = Birthdate.value;
    Names.push(temp);
    console.log(List_items)
    showTable();
    }
});

function display(){
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
        newdate.className="list-items-date";
        sr.className="list-items-date";
        newname.className="list-items-name";
        
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
            let cntMonths = 0;
            while (cntMonths < Math.abs(currMonth - birthdayMonth)) { 
                days += months[currMonth];
                ++cntMonths;
            }
            days += birthdayDate;
        }
        
        sr.textContent = cnt++;
        newname.textContent = ele.name;
        newdate.textContent = "In " + days + " Days";
        newbirthday.appendChild(sr);
        newbirthday.appendChild(newname);
        newbirthday.appendChild(newdate);
        if (newname.textContent && newdate.textContent)
        List.appendChild(newbirthday);
        List_items = document.querySelectorAll(".list-items");
        List_items.forEach(function(ele){
            ele.addEventListener('click',function(){
                    selected = ele.childNodes[0].textContent;
            });
        })
    })
}

Remove.addEventListener("click",function(){
    if(selected!=NaN)List.removeChild(List.childNodes[selected]);
    if(selected!=NaN)delete Names[selected-1];
    display();
    showTable();
})

function sortTable(){
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
}

function showTable(){        
    sortTable();
    removeAllChildNodes(List);   
    display();
    
}