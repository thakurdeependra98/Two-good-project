function loco(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

loco()

gsap.from("#nav1",{
  y:-50,
  opacity:0,
  // duration:1,
  stagger:0.1
},"come")
gsap.from("#nav2",{
  y:-50,
  opacity:0,
  // duration:1,
  stagger:0.1
},"come")

gsap.from("#brand h1",{
  y:50,
  opacity:0,
  // duration:5,
  stagger:0.2,
  delay:1
})
gsap.to("#buy svg",{
  rotate:"360deg",
  repeat:-1,
  duration:20
})

function nav(){
  var tl = gsap.timeline({
    scrollTrigger:{
      trigger:"#nav2",
      scroller:"#main",
      start:"top 0%",
      end:"top -10%",
      scrub:2,
      // markers:true,
      pin:true
    }
  })
  tl.to("#nav2",{
    opacity:0,
  },"hide")
  tl.to("#nav-part1",{
    opacity:0,
  },"hide")
  tl.to(".logo svg",{
    y:-60,
    opacity:"1",
  })
}
nav()

document.addEventListener("mousemove",function(dets){
  gsap.to(".cursor",{
    left:dets.x,
    top:dets.y
  })
})

var a = document.querySelectorAll(".product img")
a.forEach(function(elem){
  elem.addEventListener("mouseenter",function(){
    gsap.to(".cursor",{
          transform: "translate(-50%,-50%) scale(2.5)"
        })
  })
  elem.addEventListener("mouseleave",function(){
    gsap.to(".cursor",{
          transform: "translate(-50%,-50%) scale(0)"
        })
  })
})

gsap.from("#email",{
  opacity:0,
  scrollTrigger:{
    trigger:"#email",
    scroller:"#main",
    start:"top 80%",
    end:"top 60%",
    scrub:2,
    // markers:true
  }
})

gsap.from("#info svg",{
  opacity:0,
  // duration:10,
  stagger:0.5,
  scrollTrigger:{
    trigger:"#page7",
    scroller:"#main",
    start:"top 90%",
    end:"top 40%",
    scrub:2,
    // markers:true,

  }
})


var kl = gsap.timeline({
  scrollTrigger:{
    trigger:"#page7",
    scroller:"#main",
    start:"top 90%",
    end:"top 85%",
    scrub:0.1,
    // markers:true,
  }
})
kl.to("#nav-part1",{
  y:5,
  opacity:1,
},"pk")
kl.to(".logo svg",{
  y:5,
  opacity:0
},"pk")