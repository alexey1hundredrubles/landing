(()=>{
servicesChange = ({ target }) => {
	document.querySelector(".services .icon.active").classList.remove("active");
	let element = target.closest(".icon");
	element.classList.add("active");
	document.querySelector(".services .options h3").textContent = element.dataset.header;
	let first = element.dataset.first;
	let second = element.dataset.second;
	let third = element.dataset.third;

	let percent = document.querySelectorAll(".pct");

	percent[0].innerHTML = first + '<span class="pctSign">%</span>';
	percent[1].innerHTML = second + '<span class="pctSign">%</span>';
	percent[2].innerHTML = third + '<span class="pctSign">%</span>';

	graphChange(+first, +second, +third);
};

let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");
let canvasSec = document.getElementsByTagName("canvas")[1];
let ctxSec = canvasSec.getContext("2d");
let canvasThi = document.getElementsByTagName("canvas")[2];
let ctxThi = canvasThi.getContext("2d");

let id;
let idSec;
let idThi;

graphChange = (first, second, third) => {
	let endingPct = first;
	let pct = 0;
	let endingPctSec = second;
	let pctSec = 0;
	let endingPctThi = third;
	let pctThi = 0;

	cancelAnimationFrame(id);
	cancelAnimationFrame(idSec);
	cancelAnimationFrame(idThi);

	ctx.clearRect(0, 0, 120, 120);
	ctxSec.clearRect(0, 0, 120, 120);
	ctxThi.clearRect(0, 0, 120, 120);

	ctx.beginPath();
	ctxSec.beginPath();
	ctxThi.beginPath();

	pct = 0;
	pctSec = 0;
	pctThi = 0;

	requestAnimationFrame(animate);
	requestAnimationFrame(animateSec);
	requestAnimationFrame(animateThi);

	function animate() {
		draw(pct);
		pct++;
		if (pct <= endingPct) {
			id = requestAnimationFrame(animate);
		}
	}

	function animateSec(timeSec) {
		drawSec(pctSec);
		pctSec++;
		if (pctSec <= endingPctSec) {
			idSec = requestAnimationFrame(animateSec);
		}
	}

	function animateThi(timeThi) {
		drawThi(pctThi);
		pctThi++;
		if (pctThi <= endingPctThi) {
			idThi = requestAnimationFrame(animateThi);
		}
	}

	function draw(pct) {
		let endRadians = -Math.PI / 2 + (Math.PI * 2 * pct) / 100;
		ctx.arc(60, 60, 60, -Math.PI / 2, endRadians);
		ctx.lineTo(60, 60);
		ctx.fillStyle = "#19bd9a";
		ctx.fill();
	}

	function drawSec(pctSec) {
		let endRadians = -Math.PI / 2 + (Math.PI * 2 * pctSec) / 100;
		ctxSec.arc(60, 60, 60, -Math.PI / 2, endRadians);
		ctxSec.lineTo(60, 60);
		ctxSec.fillStyle = "#19bd9a";
		ctxSec.fill();
	}

	function drawThi(pctThi) {
		let endRadians = -Math.PI / 2 + (Math.PI * 2 * pctThi) / 100;
		ctxThi.arc(60, 60, 60, -Math.PI / 2, endRadians);
		ctxThi.lineTo(60, 60);
		ctxThi.fillStyle = "#19bd9a";
		ctxThi.fill();
	}
};

scrollGraph = () => {
	if (window.pageYOffset > 1800) {
		graphChange(80, 90, 60);
		document.removeEventListener("scroll", scrollGraph);
	}
};

scrollProgress = () => {
	if (window.pageYOffset > 4800) {
		changeProgress(80, 70, 90);
		document.removeEventListener("scroll", scrollProgress);
	}
};

let firstProgress = document.querySelectorAll("progress")[0];
let secondProgress = document.querySelectorAll("progress")[1];
let thirdProgress = document.querySelectorAll("progress")[2];

changeProgress = (first, second, third) => {
	if (firstProgress.value < first) {
		firstProgress.value++;
	} else if (firstProgress.value > first) {
		firstProgress.value--;
	}
	if (secondProgress.value < second) {
		secondProgress.value++;
	} else if (secondProgress.value > second) {
		secondProgress.value--;
	}
	if (thirdProgress.value < third) {
		thirdProgress.value++;
	} else if (thirdProgress.value > third) {
		thirdProgress.value--;
	}
	if (
		firstProgress.value == first &&
		secondProgress.value == second &&
		thirdProgress.value == third
	) {
		return;
	}

	setTimeout(() => {
		changeProgress(first, second, third);
	}, 10);
};

changePerson = ({ target }) => {
	document.querySelector(".team img").src = `IMG/person${target.dataset.person}.jpg`;
	document.querySelector(".team h3").textContent = target.dataset.name;
	document.querySelector(".team i").textContent = target.dataset.position;
	document.querySelectorAll(".team a")[0].textContent = target.dataset.first + "%";
	document.querySelectorAll(".team a")[1].textContent = target.dataset.second + "%";
	document.querySelectorAll(".team a")[2].textContent = target.dataset.third + "%";
	changeProgress(+target.dataset.first, +target.dataset.second, +target.dataset.third);
};

changeReviewer = ({ target }) => {
	document.querySelector(".testimonials img").src = `IMG/review/person${
		target.dataset.person
	}.png`;
	document.querySelector(".testimonials .green").textContent = target.dataset.name;
	document.querySelector(".testimonials .bottom-text").textContent = target.dataset.position;
};

document.addEventListener("scroll", scrollGraph);

document.addEventListener("scroll", scrollProgress);

document.querySelectorAll(".services .icon").forEach(icon => {
	icon.addEventListener("click", servicesChange);
});

document.querySelectorAll("div.portfolio > div.menu > .selector").forEach(item => {
	item.addEventListener("click", ({ target }) => {
		document.querySelector(".portfolio>.menu>div.selector.select").classList.remove("select");
		target.classList.add("select");
	});
});

document.querySelectorAll(".details-about .icon").forEach(item => {
	item.addEventListener("click", ({ target }) => {
		document
			.querySelector(".details-about .icon.select")
			.closest(".icon.select")
			.classList.remove("select");
		target.closest(".icon").classList.add("select");
	});
});

document.querySelectorAll('.team input[type="radio"]').forEach(item => {
	item.addEventListener("click", changePerson);
});

document.querySelectorAll('.testimonials input[type="radio"]').forEach(item => {
	item.addEventListener("click", changeReviewer);
});

document.querySelector('.map > .cover').addEventListener('click',({target})=>{
	target.style.opacity=0;
	setTimeout(()=>{target.style.zIndex=-1;},500)
})

document.querySelectorAll('header .link').forEach(item=>{
	item.addEventListener('click',({target})=>{
		// console.log(target)
		let to=document.getElementById(target.dataset.to)
		to.scrollIntoView({behavior:'smooth'})
	})
})
})()