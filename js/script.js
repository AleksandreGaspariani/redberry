
//descriptions and headers for each form.
let stageinfo = [
    {
        title: 'Redberry Origins',
        info: 'You watch “What? Where? When?” Yeah. Our founders used to play it. That’s where they got a question about a famous American author and screenwriter Ray Bradbury. Albeit, our CEO Gaga Darsalia forgot the exact name and he answered Ray Redberry. And at that moment, a name for a yet to be born company was inspired - Redberry 😇'
    },
    {
        title: 'A bit about our battles',
        info: 'As we said, Redberry has been on the field for quite some time now, and we have touched and embraced a variety of programming languages, technologies, philosophies, and frameworks. We are battle-tested in PHP Laravel Stack with Vue.js, refined in React, and allies with Serverside technologies like Docker and Kubernetes, and now we have set foot in the web3 industry.'
    },
    {
        title: 'Redberry Covid Policies',
        info: 'As this infamous pandemic took over the world, we adjusted our working practices so that our employees can be as safe and comfortable as possible. We have a hybrid work environment, so you can either work from home or visit our lovely office on Sairme Street. If it was up to us, we would love you to see us in the office because we think face-to-face communications > Zoom meetings. Both on the fun and productivity scales. '
    },
    {
        title: 'Redberrian Insights',
        info: 'We were soo much fun before the pandemic started! Parties almost every weekend and lavish employee birthday celebrations! Unfortunately, covid ruined that fun like it did almost everything else in the world. But we try our best to zhuzh it up a bit. For example, we host biweekly Devtalks where our senior and lead developers talk about topics they are passionate about. Previous topics have included Web3, NFT, Laravel 9, Kubernetes, etc. We hold these talks in the office but you can join our Zoom broadcast as well. Feel free to join either as an attendee or a speaker!'
    }
];  
	
let stage = document.getElementsByClassName('formstage');
let title = document.getElementById('title');
let description = document.getElementById('description');

for (var i = 0 ; i < stage.length ; i++) {
	stage[i].className.split(' ');
	let t = stage[i].className.split(' ');
	if (t.length == 1) {
		title.innerText = stageinfo[i].title;
		description.innerText = stageinfo[i].info;
	}
}

// validation

$('#stages .fa-circle').click(function() {
    var index = $(this).index();
    
    if (isValidFirstForm('firstname','lastname','email','number')){
        if(checkIndex(this)){
            changeIndex(this); 
        }
    }

    
});

function isValidFirstForm(firstname, lastname, email, phone){
    
    textValidate(firstname);
    textValidate(lastname);
    emailValidate(email);
    phoneValidate(phone);

    if (textValidate(firstname) && textValidate(lastname) && emailValidate(email) && phoneValidate(phone)) {
        return true;
    }
    
}

function phoneValidate(phone){
    if (phone != undefined) {

        $(`#${phone}`).focusin(()=>{
            $(`#${phone}`).css('border','1px solid #8d8d8d');
            $(`#${phone}`).focusout(()=>{ 
                $(`#${phone}Err`).text('');
            });
        });

        let number = $(`#${phone}`).val(); 
        if(number.length > 0 && number.length != 13 ){
            redBorder(phone);
            $(`#${phone}Err`).text('* wrong number format (+995 5__ __ __ __)');
        }else if(number.length === 0){
            redBorder(phone);
            $(`#${phone}Err`).text(`* `+$(`#${phone}`).attr("name")+` is required`);
        }else{
            return true;
        }
    }
}

function emailValidate(email){
    if (email != undefined) {
        let validemail = $(`#${email}`).val();
        validemail = validemail.split('');

        $(`#${email}`).focusin(()=>{
            $(`#${email}`).css('border','1px solid #8d8d8d');
            $(`#${email}`).focusout(()=>{ 
                $(`#${email}Err`).text('');
            });
        });

        if (validemail.length != 0 && !validemail.includes('@',0)) {
            redBorder(email);
            $(`#${email}Err`).text(`* Wrong `+$(`#${email}`).attr("placeholder")+``);
        }else if (validemail.length === 0) {
            redBorder(email);
            $(`#${email}Err`).text(`* `+$(`#${email}`).attr("placeholder")+` is required`);
        }else{
            return true;
        }
    }
}

function textValidate(text){
    if (text != undefined) {
        var valid = $(`#${text}`).val();

        $(`#${text}`).focusin(()=>{
            $(`#${text}`).css('border','1px solid #8d8d8d');
            $(`#${text}`).focusout(()=>{ 
                $(`#${text}Err`).text('');
            });
        });

        
        if(valid.length > 0 && valid.length < 2){
            $(`#${text}`).css('border','1px solid red');
            $(`#${text}Err`).text(`* `+$(`#${text}`).attr("placeholder")+` should include 2 or more characters`);
        }else if(valid.length === 0){
            $(`#${text}`).css('border','1px solid red');
            $(`#${text}Err`).text(`* `+$(`#${text}`).attr("placeholder")+` is required`);
        }else{
            return true;
        }
        
    }
}

function changeIndex(element){
    let index = $(element).attr('data-index');
    let activeIndex = $('#stages .active').attr('data-index');
    $('#stages .active').removeClass('active');
    $('[data-index="'+index+'"]').addClass('active');
    $('#stage'+activeIndex).addClass('hide');
    $('#stage'+index).removeClass('hide');
}

function checkIndex(element){
    if($(element).hasClass('active')){
        return false;
    }
    return true;
}

function redBorder(text){
    $(`#${text}`).css('border','1px solid red');
}


// ajax request to skills api.

$(function(){
    let skills = $('#skills');

    $.ajax({
        type: 'GET',
        url: 'https://bootcamp-2022.devtest.ge/api/skills',
        success: function(skillList){
            $.each(skillList, function(i, skill){
                skills.append(`
                    <option value="${skill.title}">${skill.title}</option>
                `);
            });
        }
    });
});