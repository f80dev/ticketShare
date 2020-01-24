var config;

function getParam():any {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi,
        ( m, key, value ):any => { vars[key] = value !== undefined ? value : '';}
    );
    return vars;
}

function getServer(){
    var server=getParam().server;
    if(server==null)server="https://reducshare.com";
    if(!server.startsWith("http"))server="http://"+server;
    return server;
}


function getModels(filter="") {
    fetch(getServer()+"/assets/config.json").then(function (r) {
        r.json().then(function (data) {
            config = data;
            var s = "<table style='display: inline-block;width:100%;margin-left:1vw;' cellpadding='15px'><tr><th></th><th></th></tr>";
            config.modeles.forEach((modele) => {
                if((filter.length==0 && modele.score>14) || (modele.score>10 && filter.length>0 && (modele.tags.length==0 || modele.tags.indexOf(filter)>-1))){
                    var desc=modele.description;
                    if(desc==null)desc=modele.label;
                    desc=desc+" "+modele.conditions;
                    if(modele.id==null)modele["id"]="";
                    var run_url="https://reducshare.com/?command=add_pseudo,add_shop("+modele.tags+"),add_promo("+modele.id+")";
                    var test_button="<br><div style='margin-top:4px;padding:5px;font-size: x-small;pointer-events: none;' class='btn btn-secondary'>Tester</div>";

                    if(modele.share_bonus>0)
                        desc=desc+"<br><span style='font-size: small;color:gray;'>";
                    if(modele.direct_bonus>0)desc=desc+"Quand il récupère le coupon, le client gagne immédiatement "
                            +modele.direct_bonus+modele.symbol+", et ";
                    else
                        desc=desc+"Le client récupère le coupon et ";

                    if(modele.share_bonus>0)desc=desc+"son gain augmente de 1"
                            +modele.symbol+" supplémentaire chaque fois qu'il le partage "+(1/modele.share_bonus)+" fois</span>";
                    s = s + "<tr><td style='width:100px;text-align: center;margin:0px;'><a href='"+run_url+"'><img src='"+modele.picture+"' style='width:80px;'>"+test_button+"</a></td><td>" + desc + "</td>";

                    s=s+"</tr>"
                }
            });
            s = s + "</table>";
            document.getElementById("zoneModels").innerHTML = s;
        });
    });
}

/**
 * Fonction de remplacement
 * @param text
 * @param to_find
 * @param _new
 */
function replaceAll(text:string,to_find:string,_new:string){
    for(let i=0;i<10;i++)
        text=text.replace(to_find,_new);
    return text;
}


/**
 *
 * @param template
 * @param zone
 * @param file
 * @param brand
 */
function createFaq(template:string="",zone:HTMLElement,file:string="/config.json",func=null){
    fetch(getServer()+"/assets/"+file).then(function (r:any) {
        r.json().then(function (config) {
            var i = 0;
            var s = "";
            if (config.faqs != null) {
                config.faqs.forEach((faq) => {
                    if (!faq.id)
                        faq.id = "faq_" + i;
                    else
                        faq.id="faq_"+faq.id;

                    s =s + template;
                    for(var j=0;j<3;j++){
                        s=s.replace("faq_title", faq.title);
                        if(faq.content.startsWith("http") || faq.content.endsWith("html")){
                            faq.content="<div class='embed-responsive embed-responsive-16by9'><iframe width='100%' class='embed-responsive-item' src='"+faq.content+"?brand=REDUCSHARE' frameborder='0'></iframe></div>";
                        }
                        s = s.replace("faq_content", faq.content);
                        s = s.replace("faq_id", faq.id);
                        s = s.replace("faq_head_id", "head_" + faq.id);
                        if(func)func();
                    }
                });
            }
            zone.innerHTML = s;
        });
    });
}



function start_exemple(func) {
    var competences = {
        step0:{
            image:"",
            label:"Prenons l'exemple d'un boulanger<br>utilisant REDUCSHARE"
        },
        step1:{
            image:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/232/baguette-bread_1f956.png",
            label:"John viens acheter son pain. Dans la boulangerie,<br>il tombe sur une affiche de promotion pour des croissants",

        },
        step2:{
            image:"https://web.reducshare.com/img/qrcode.png",
            label:"Pour profitez de la promotion,<br>il flash le QRCode présent sur l'affiche.",

        },
        step3:{
            image:"https://web.reducshare.com/img/recup_promo.png",
            label:"Son téléphone affiche immédiatement<br>tous les détails de l'offre"
        },
        step4:{
            image:"https://web.reducshare.com/img/social.png",
            label:"Plutôt qu'utiliser sa promotion REDUCSHARE lui propose <br>de l'envoyer à ses contacts pour gagner d'autres croissants"
        },
        step5:{
            image:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/232/victory-hand_270c.png",
            label:"De retour chez lui,<br>la promotion n'indique plus 1, mais 2 croissants gagnés !"
        },
        step6:{
            image:"https://web.reducshare.com/img/2croissants.png",
            label:"Le lendemain, le boulanger flash le code de sa promotion<br>puis lui offre les 2 croissants comme indiqué sur son téléphone",
        },
        step7:{
            image:"https://web.reducshare.com/img/hourglass.png",
            label:"le stock de croissants prévu pour la promotion est épuisé<br>Elle disparait automatiquement de tous les téléphones",
        }
    };
    var toActivate=true;
    for(var p in competences){
        var div=document.createElement("div");
        if(competences[p].label==null)competences[p].label="";
        div.innerHTML="<img style='margin:10px;height:200px;max-width:350px;' src='"+competences[p].image+"' class='logos-competences'><br><br>" +
            ""+competences[p].label+"";

        if(toActivate){
            toActivate=false;
            div.className="carousel-item active";
        } else
            div.className="carousel-item";

        document.getElementById("carousel_content").appendChild(div);
    }
    if(func)func();
}
