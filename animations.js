window.addEventListener("load", () => {
const canvas=document.getElementById("form");
const benrikit=canvas.getContext("2d");
let timer;
let changeimginterval;
let ginterval;
let anzu=[];
let dspcounter=0;
const disp=document.getElementById("countertext");



const anzuchansizeyoko=100;
const anzuchansizetate=100;

const futsu=new Image();
futsu.src="2.png";

const oisii=new Image();
oisii.src="3.png";
let anzuX=0;
let anzuY=0;
let anzustate=futsu;
class anzumk
{
    constructor()
    {
        this.width=40;
        this.height=40;
        this.x=canvas.width;
        this.y=15;
        this.speed=6;
        this.image=new Image();
        this.image.src="anzu.png"
    }
    update()
    {    
    this.x-=this.speed;
    }
    draw()
    {
    benrikit.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    }

    function gen_anzu()
    {
        anzu.push(new anzumk());
    }

 function updateanzu()
{
    anzu.forEach((item,index)=>
    {
    item.update();
    item.draw();
    if(item.x+item.width/2<0)
        {
            anzu.splice(index,1);
        }
});
}

function responsive() {	
  {
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    benrikit.scale(2, 2);
  }	}
  window.addEventListener('resize', responsive);
  responsive();


function update()
    {
benrikit.clearRect(0,0,canvas.width,canvas.height);
benrikit.drawImage(anzustate,anzuX,anzuY,anzuchansizeyoko,anzuchansizetate);
  updateanzu();
    }

    function re()
    {
      clearTimeout(changeimginterval);
      changeimginterval=setTimeout(() => 
     {

        anzustate=futsu;
            
     }, 800);
    }

function syoutotsuchk() 
{
      anzu.forEach((item,index)=>
        {
            const dstX=item.x-(anzuX+anzuchansizeyoko/2);
            const dstY=item.y-(anzuY+anzuchansizetate/2);
            const dst=Math.hypot(dstX,dstY);
            if(dst<item.width/2+anzuchansizeyoko/2)
            {
                anzu.splice(index,1);
                dspcounter++;
                localStorage.setItem("count",dspcounter);
                disp.innerHTML=dspcounter;
                anzustate=oisii;
                re();
            }
              
            }
        
        );
}


function begin()
{
  dspcounter=localStorage.getItem("count");
  disp.innerHTML=dspcounter;
gen_anzu();
  ginterval=setInterval(()=>
{
    update();
    syoutotsuchk();
},1000 / 60);
}
setInterval(gen_anzu,5000);
futsu.onload = () => {
  oisii.onload = () => {
      begin();
  };
};
document.body.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    gen_anzu();
  }
});
canvas.addEventListener("click",gen_anzu);
    });

