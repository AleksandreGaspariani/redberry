
function thnkForJoining(){
    $('#thnkForJoining').removeClass('hide');
    $('#formBtns').addClass('hide');
    const changePage = setTimeout(changeHref,3000);
}

function changeHref (){
    window.location.replace('index.html');
}

//descriptions and headers for each form.
function stageDescriptions(){
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
}
// Colorize valid buttons

function colorizeButtons(){
    $('.fa-circle').removeClass('checked');

    circles.forEach(btn => {
        $(`[data-index=${btn}]`).addClass('checked');
    });
}

function sendPostRequest(){
    let myData = getAllDataForSubmit();
    console.log(myData);
    $.ajax({
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        url: 'https://bootcamp-2022.devtest.ge/api/application',
        data: JSON.stringify(myData)
    })
}
$('#submitApplication').on('click',()=>{
    thnkForJoining();
    sendPostRequest();
});


// data format 

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// get all data for submit post.


function getAllDataForSubmit(){
    let uniq_token = "7f95c0a2-a90a-4abc-aa50-5dc6ff554316";
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let email = $('#email').val();
    let number = $('#number').val();
    let skillObj = $('.skilllist').children();
    let workPreference = radioButtonsOnClick();
    workPreference = workPreference.data[0];
    let hadCovid = radioButtonsOnClick();
    let vaccinated = hadCovid.vaccine;
    hadCovid = hadCovid.covid;
    let had_covid_at = $(`#covidDate`).val();
    had_covid_at = Date(had_covid_at);
    had_covid_at = formatDate(had_covid_at);
    let vaccinated_at = $('#vaccineDate').val()
    vaccinated_at = Date(vaccinated_at);
    vaccinated_at = formatDate(vaccinated_at);
    let devtalkStaff = devTalkRadionsOnClick();
    let devtalkTopic = devtalkStaff.devtalk_topic;
    let somethingSpecial = devtalkStaff.something_special;
    devtalkStaff = devtalkStaff.devtalk;

    let data = {
        "token" : uniq_token,
        "first_name" : firstname,
        "last_name" : lastname,
        "email" : email,
        "phone" : number,
        "skills" : [],
        "work_preference": workPreference,
        "had_covid" : hadCovid,
        "had_covid_at" : had_covid_at,
        "vaccinated" : vaccinated,
        "vaccinated_at" : vaccinated_at,
        "will_organize_devtalk" : devtalkStaff,
        "devtalk_topic" : devtalkTopic,
        "something_special" : somethingSpecial
    }
    
    for (let index = 0; index < skillObj.length; index++){
        let getIdOfSkill = $(skillObj[index]).attr('name');
        getIdOfSkill = getIdOfSkill.split('-');
        getIdOfSkill = getIdOfSkill[1];

        getIdOfSkill = parseInt(getIdOfSkill, 10);

        let getExperience = $(skillObj[index]).find('strong').text();
        getExperience = parseInt(getExperience, 10);

        let skillArr = {"id":getIdOfSkill,"experience":getExperience};
        data.skills.push(skillArr);
    }
    
    return data;
}

// validation
$('[data-index=5]').on('click',()=>{
    getAllDataForSubmit();
    getDevTalkData();
    if (getDevTalkData()) {
        $('.info').addClass('hide');
        $('.questions').addClass('hide');
        $('#submitForm').removeClass('hide');
    }else {
        return;
    }
});

$('[data-index=4]').on('click',()=>{
    covidStaffGetData();
});

$('[data-index=3]').on('click',()=>{
    isEmptySkills();
});

$('#stages .fa-circle').click(function() {
    var index = $(this).index();
    var current = $('#stages').find('.active').attr('data-index');
    current = parseInt(current, 10);
    isValidFirstForm('firstname','lastname','email','number');
    colorizeButtons();
    let maxValid = Math.max(...circles);
    maxValid = parseInt(maxValid, 10) + 1;
    
    if (index < current) {
        changeIndex(this);
    }
    if(index > current && circles.includes(current)){
        if(circles.includes(index)){
            changeIndex(this);
            return;
        }
        if(index == maxValid){
            changeIndex(this);
            return;
        }
        moveToNextIndex(current);
    }
    
    if(index == current){
        return false;
    }
});

// remove circle 

function removeCircle(index){

    let arr = circles;
    circles = [];
    arr.forEach(element => {
      if (element != index) {
        circles.push(element);
      }
    });
}

function removeSkillFromArr(elements){
    let skill = $(elements).parent().parent().attr('id');
    
    let arr = skillContainer;
    skillContainer = [];
    arr.forEach(element => {
      if (element != skill) {
        skillContainer.push(element);
      }
    });
}

// move to next index.

function moveToNextIndex(curIndex){
    let nextIndex = curIndex + 1;
    $('#stages .active').removeClass('active');
    $('[data-index="'+nextIndex+'"]').addClass('active');
    $('#stage'+curIndex).addClass('hide');
    $('#stage'+nextIndex).removeClass('hide');
}

let circles = [];

function isValidFirstForm(firstname, lastname, email, phone){
    let validFirstForm = [textValidate(firstname),textValidate(lastname),emailValidate(email),phoneValidate(phone)];

    if (validFirstForm.includes(false)) {
        removeCircle(1);
        return false;
    }else{
        if (!circles.includes(1)) {
            circles.push(1);
        }
        return true;
    }
}

function phoneValidate(phone){
    let isValid = false;
    if (phone != undefined) {

        $(`#${phone}`).focusin(()=>{
            $(`#${phone}`).css('border','1px solid #8d8d8d');
            $(`#${phone}`).focusout(()=>{ 
                $(`#${phone}Err`).text('');
            });
        });

        let number = $(`#${phone}`).val(); 
        // let pattern = /^\(?([+]{1}[9]{1}[9]{1}[5]{1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]([0-9]{2})[-. ]([0-9]{2})[-. ]?$/;
        let newPattern = /^\(?([+]{1}[9]{1}[9]{1}[5]{1}[0-9]{3}[0-9]{2}[0-9]{2}[0-9]{2})\)?$/;
        if(number.length > 0 && !number.match(newPattern)){
            redBorder(phone);
            $(`#${phone}Err`).text('* wrong number format (+995 5__ __ __ __), w/o spaces between');
        }else if(number.length === 0){
            redBorder(phone);
            $(`#${phone}Err`).text(`* `+$(`#${phone}`).attr("name")+` is required`);
        }else{
            isValid = true;
        }
    }
    return isValid;
}


function emailValidate(email){
    let isValid = false;
    if (email != undefined) {
        let validemail = $(`#${email}`).val();
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
        $(`#${email}`).focusin(()=>{
            $(`#${email}`).css('border','1px solid #8d8d8d');
            $(`#${email}`).focusout(()=>{ 
                $(`#${email}Err`).text('');
            });
        });
        if (validemail.length != 0 && !validemail.match(pattern)) {
            redBorder(email);
            $(`#${email}Err`).text(`* Wrong `+$(`#${email}`).attr("placeholder")+``);
        }else if (validemail.length === 0) {
            redBorder(email);
            $(`#${email}Err`).text(`* `+$(`#${email}`).attr("placeholder")+` is required`);
        }else{
            isValid = true;
        }
    }
    return isValid;
}

function textValidate(text){
    let isValid = false;
    if (text != undefined) {
        
        var valid = $(`#${text}`).val();

        $(`#${text}`).focusin(()=>{
            $(`#${text}`).css('border','1px solid #8d8d8d');
            $(`#${text}`).focusout(()=>{ 
                $(`#${text}Err`).text('');
            });
        });

        
        if(valid.length > 0 && valid.length < 2){
            redBorder(text);
            $(`#${text}Err`).text(`* `+$(`#${text}`).attr("placeholder")+` should include 2 or more characters`);
        }else if(valid.length === 0){
            redBorder(text);
            $(`#${text}Err`).text(`* `+$(`#${text}`).attr("placeholder")+` is required`);
        }else{
            isValid = true;
        }
    }
    return isValid;
}
// Covid staff 
let had_covid = false;

let vaccinated = false;
let had_covid_at = '';
let vacinated_at = '';

// 
    function radioButtonsOnClick(){
        let covidStaff = false;
        let vaccineStaff = false;
        let covid = false;
        let vaccine = false;
        let inputs = $('#stage3 section div.round').children('input');
        let stage3 = [];
        $.each(inputs, function(i,text){
            if ($(text).is(":checked")) {
                stage3.push($(text).attr('value'));
            }
        });

        // had covid 
        if (stage3.includes('covidYes')) {
            covid = true;
            $('#contactCovid').removeClass('hide');
            $('#covidDate').on('focusout',()=>{
                let had_covid_at = $('#covidDate').val();
                if(had_covid_at.length < 2){
                    redBorder('covidDate');
                    $('#covidDateErr').text('* Date is required.');
                }else{
                    $(`#covidDate`).css('border','1px solid #8d8d8d');
                    $('#covidDateErr').text('');
                }
            });
            if ($('#covidDate').val().length > 2) {
                covidStaff = true;
            }
        }else if(stage3.includes('covidNo')){
            $('#contactCovid').addClass('hide');
            covid = false;
            covidStaff = true;
        }
        // vaccinated
        if (stage3.includes('vaccineYes')) {
            vaccine = true;
            $('#vaccinated').removeClass('hide');

            $('#vaccineDate').on('focusout',()=>{
                let vaccinated_at = $('#vaccineDate').val();
                if(vaccinated_at.length < 2){
                    redBorder('vaccineDate');
                    $('#vaccineDateErr').text('* Date is required.');
                }else{
                    $(`#vaccineDate`).css('border','1px solid #8d8d8d');
                    $('#vaccineDateErr').text('');
                }
            });
            if ($('#vaccineDate').val().length > 2) {
                vaccineStaff = true;
            }
        }else if(stage3.includes('vaccineNo')){
            $('#vaccinated').addClass('hide');
            vaccineStaff = true;
        }


        if (vaccineStaff && covidStaff) {
            if (stage3.length == 3) {
                return {
                    'isValid' : true,
                    'data' : stage3,
                    'had_covid' : had_covid,
                    'vaccinated' : vaccinated,
                    'covid' : covid,
                    'vaccine' : vaccine
                };
            }else return {
                'isValid' : false
            }
        }else return {
            'isValid' : false
        };
    }
// 

    function covidStaffGetData(){
        
        let radioBtns = radioButtonsOnClick();
        
        if(radioBtns.isValid){
            circles.push(3);
        }else{
            removeCircle(3);
        }

        
    }

    
// Dev talks
    function devTalkRadionsOnClick(){
        let willOrganizeDevtalk = false;
        let willOrganize = false;
        let devtalkTopic = '';
        let somethingSpeial = false;
        let something_special = '';
        let stage4 = [];
        let inputs = $('#stage4 section div.round').children('input');
        // devtalks radio buttons
        $.each(inputs, function(i,text){
            if ($(text).is(":checked")) {
                stage4.push($(text).attr('value'));
            }
        });

        // devtalks
        if (stage4.includes('Yes')) {
            stage4 = [true];
            willOrganize = true;
            $('#devTalkTextarea').removeClass('hide');
            $('#devtalks').on('focusout',()=>{
                if ($('#devtalks').val().length > 0) {
                    $('#devtalkErr').text('');
                    $(`#devtalks`).css('border','1px solid #8d8d8d');
                }else{
                    $('#devtalkErr').text('* fill this field.');
                    redBorder('devtalks');
                }
            });
            if ($('#devtalks').val().length > 0) {
                devtalkTopic =  $('#devtalks').val();
                willOrganizeDevtalk = true;

            }
        }else if (stage4.includes('No')) {
            stage4 = [false];
            willOrganize = false;
            willOrganizeDevtalk = true;
            devtalkTopic =  'I wouldn`t';
            $('#devTalkTextarea').addClass('hide');
        }

        // something special
        $('#somethingSpecial').on('focusout',()=>{
            if ($('#somethingSpecial').val().length > 0) {
                $('#somethingSpecialErr').text('');
                $(`#somethingSpecial`).css('border','1px solid #8d8d8d');
            }else{
                $('#somethingSpecialErr').text('* fill this field.');
                redBorder('somethingSpecial');
            }   
        });
        if ($('#somethingSpecial').val().length > 0) {
            somethingSpeial = true;
            something_special = $('#somethingSpecial').val();
        }
        if (somethingSpeial && willOrganizeDevtalk) {
            if (stage4.length > 0) {
                return {
                    'isValid' : true,
                    'data' : stage4,
                    'will_organize_devtalk' : willOrganizeDevtalk,
                    'devtalk_topic' : devtalkTopic,
                    'something_special' : something_special,
                    'devtalk' : willOrganize
                }
            }else{
                return {
                    'isValid' : false,
                }
            }
        }else{
            return {
                'isValid' : false,
            }
        }

    }

    function getDevTalkData() {

        let devTalkStaff = devTalkRadionsOnClick();
        if (devTalkStaff.isValid) {
            circles.push(4);
            return true;
        }else{
            removeCircle(4);
            return false;
        }
        
    }

// change form w/o refresh

function changeIndex(element){
    let index = $(element).attr('data-index');
    let activeIndex = $('#stages .active').attr('data-index');
    $('#stages .active').removeClass('active');
    $('[data-index="'+index+'"]').addClass('active');
    $('#stage'+activeIndex).addClass('hide');
    $('#stage'+index).removeClass('hide');
    stageDescriptions();
    
}


function checkIndex(element){
    if($(element).hasClass('active')){
        return false;
    }
    return true;
}


function redBorder(text){
    $(`#${text}`).css('border','1px solid #FE3B1F');
}

function removeSkill(element){
    removeSkillFromArr(element);
    $(element).closest('section').remove();

}

// check single application

function expandContent(element){
    let elem = $(element).parent().parent().attr('id');
    $(`#${elem} .header`).toggleClass('expandedHeaderColor');
    $(`#${elem} .content`).toggleClass('hide').toggleClass('justifContent');
}

// go back to forms

function goBack(){
    $('#submitForm').addClass('hide');
    $('.questions').removeClass('hide');
    $('.info').removeClass('hide');
    $('#stage4').removeClass('hide');
    $('[data-index=5]').removeClass('active');
    $('[data-index=4]').addClass('active');
}

// ajax request to skills api.

function appendSkills(){
    let url = 'https://bootcamp-2022.devtest.ge/api/skills';
    getSkills(url); 
}

function getSkills(url,data = {}){

    let skills = $('#skills');

    $.ajax({
        type: 'GET',
        url: url,
        data: data,
        success: function(skillList){
            $.each(skillList, function(i, skill){
                skills.append(`
                    <option value="${skill.title}" id="skill-${skill.id}">${skill.title}</option>
                `);
            });
        }
    });
}

// if skillContainer is empty.

function checkIfEmptySkills(){
    if (skillContainer.length < 1) {
        removeCircle(2);
    }
}

// dynamically add skills

let skillContainer = [];
function addSkill(){
    let isValid = false;
    var skill = $("#skills option:selected").val();
    var skill_id = $("#skills option:selected").attr('id');
    skill_id = skill_id.split('-');
    skill_id = skill_id[1];
    let pattern = /([1-9])/;
    let experience = $('#experienceYear').val();

    if (experience.length < 1) {
        $('#experienceErr').text('Experience is required');
        redBorder('experienceYear'); 
    }else if(!experience.match(pattern)){
            $('#experienceErr').text('* only numbers allowed');
            redBorder('experienceYear');
    }else{
        if (skillContainer.includes(skill)) {
            $('#existSkillErr').text('This skill is already added');
        } else {

            let skilllist = $('.skilllist');
            skilllist.append(`
                <section id="${skill}" name="id-${skill_id}">
                    <div><b>${skill}</b></div>
                    <div><b>Years of experience: <strong>${experience}</strong></b></div>
                    <div><i class="fa-solid fa-circle-minus" onclick="removeSkill(this)"></i></div>
                </section>
            `);

            $('#experienceYear').css('border','1px solid #8d8d8d');
            $('#experienceErr').text('');
            $('#existSkillErr').text('');

            skillContainer.push(skill);
        }
    }

    if (skillContainer.length > 0) {
        isValid = true;
    }
    
    return isValid;
}
// check if skills not empty

function isEmptySkills(){
    let isValid = false;
    if (skillContainer.length > 0) {
        if (!circles.includes(2)) {
            circles.push(2);
        }
        isValid = true;
    }else{
        $('#existSkillErr').text('* select one skill');
        redBorder('skills');
        removeCircle(2);
    }

    return isValid;
}

$('#addSkill').on('click',function(){
    addSkill();
    $('#skills').css('border','1px solid #8d8d8d');
});



// ajax get applications

function getApplications(){

    $.ajax({
        type: 'GET',
        url: 'https://bootcamp-2022.devtest.ge/api/applications',
        data: {
            'token' : '7f95c0a2-a90a-4abc-aa50-5dc6ff554316'
        },
        success: function(applications){

            loadApplications(applications);
            
        }
    });

};
// get skill by id for draw in application

function getSkillById(id){
    const list = [
        {
            "id": 1,
            "title": "HTML"
        },
        {
            "id": 2,
            "title": "CSS"
        },
        {
            "id": 3,
            "title": "PHP"
        },
        {
            "id": 4,
            "title": "Laravel"
        },
        {
            "id": 5,
            "title": "React.JS"
        },
        {
            "id": 6,
            "title": "Vue.JS"
        },
        {
            "id": 7,
            "title": "Svelte"
        },
        {
            "id": 8,
            "title": "Angular"
        }
    ];
    let response;
    list.forEach(element => {
        if (element['id'] == id) {
            response = element.title; 
        }
    });
    return response;
}

// check radio buttons if it's true or false.

function hadCovid(index,application){
    if (application['had_covid']) {
        $(`#covidYes_${index}`).toggleClass('checkedSpan');
    }else{
        $(`#covidNo_${index}`).toggleClass('checkedSpan');
    }
}

function vaccine(index,application){
    if (application['vaccinated']) {
        $(`#vaccinatedYes_${index}`).toggleClass('checkedSpan');
    }else{
        $(`#vaccinatedNo_${index}`).toggleClass('checkedSpan');
    }
}

function willOrganizeDevtalk(index,application){
    if (application['vaccinated']) {
        $(`#devtalksYes_${index}`).toggleClass('checkedSpan');
    }else{
        $(`#devtalksNo_${index}`).toggleClass('checkedSpan');
    }
}

function preferToWorkCheck(index,application){
    $(`#${application['work_preference']}_${index}`).toggleClass('checkedSpan');
}

// draw application

function drawApplicationForm(index, application){

    $('.applications').append(`<div class="application" id="app-${index}">
        <div class="header">
            <p>${index}</p>
            <i class="fa-solid fa-angle-down" onclick="expandContent(this)"></i>
        </div>
        <div class="content hide">
            <div class="contentLeft">
                <div class="infoTab">
                    <h1>Personal Information</h1>
                    <div>
                        <label for="firstname">First Name</label>
                        <p>${application['first_name']}</p>
                    </div>
                    <div>
                        <label for="lastname">Last Name</label>
                        <p>${application['last_name']}</p>
                    </div>
                    <div>
                        <label for="email">E Mail</label>
                        <p>${application['email']}</p>
                    </div>
                    <div>
                        <label for="phone">Phone</label>
                        <p>${application['phone']}</p>
                    </div>
                </div>
                <div class="infoTab">
                    <h1>Covid Situation</h1>
                    <div class="col">
                        <label>how would you prefer to work?</label>
                        <div class="round">
                            <span id="from_office_${index}"></span>
                            <p>From Sairme Office</p>
                        </div>
                        <div class="round">
                            <span id="from_home_${index}"></span>
                            <p>From Home</p>
                        </div>
                        <div class="round">
                            <span id="hybrid_${index}"></span>
                            <p>Hybrid</p>
                        </div>
                    </div>
                    <div class="col">
                        <label for="lastname">Did you have covid 19?</label>
                        <div class="round">
                            <span id="covidYes_${index}"></span>
                            <p>Yes</p>
                        </div>
                        <div class="round">
                            <span id="covidNo_${index}"></span>
                            <p>No</p>
                        </div>
                    </div>
                    <div class="col">
                        <label>When did you have covid 19?</label>
                        <input type="text" value='${application['had_covid_at']}' name="covid" id="covidDate" disabled></input>
                    </div>
                    <div class="col">
                        <label>Have you been vaccinated?</label>
                        <div class="round">
                            <span id="vaccinatedYes_${index}"></span>
                            <p>Yes</p>
                        </div>
                        <div class="round">
                            <span id="vaccinatedNo_${index}"></span>
                            <p>No</p>
                        </div>
                    </div>
                    <div class="col">
                        <label>When did you get covid vaccine?</label>
                        <input type="text" value='${application['vaccinated_at']}' name="vaccine" id="vaccineDate" disabled></input>
                    </div>
                </div>
            </div>
            <div class="contentRight">
                <div class="infoTab">
                    <h1>Skillset</h1>
                    <div id='skills-${index}'>
                    
                    </div>
                    
                </div>
                <div class="infoTab">
                    <h1>Insigts</h1>
                    <div class="col">
                        <label>Would you attend Devtalks and maybe also organize your own?</label>
                        <div class="round">
                            <span id="devtalksYes_${index}"></span>
                            <p>Yes</p>
                        </div>
                        <div class="round">
                            <span id="devtalksNo_${index}"></span>
                            <p>No</p>
                        </div>
                    </div>
                    <div class="col">
                        <label>What would you speak about at Devtalk?</label>
                        <textarea id="" cols="30" rows="10" placeholder="${application['devtalk_topic']}" disabled></textarea>
                    </div>
                    <div class="col">
                        <label>Tell us somthing special</label>
                        <textarea id="" cols="30" rows="10" placeholder="${application['something_special']}" disabled style="min-height: 70px;"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>`);

    preferToWorkCheck(index,application);
    hadCovid(index,application);
    vaccine(index,application);
    willOrganizeDevtalk(index,application);

    $.each(application.skills, function(i,skill){
        let lang = getSkillById(skill.id);
        $(`#skills-${index}`).append(`
            <div>
                <label>${lang}</label>
                <p>Years of experience: ${skill.experience}</p>
            </div>
        `)
    });
}

function loadApplications(obj){
    $.each(obj, function(i, application){
        drawApplicationForm(i,application);
    });
}


$( document ).ready(function() {
    getApplications();
    appendSkills();
    stageDescriptions();
});