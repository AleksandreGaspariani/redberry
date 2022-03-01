
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
