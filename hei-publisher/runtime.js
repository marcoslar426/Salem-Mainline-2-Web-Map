/* HEI Publisher: managed runtime v1 */
(function(g){'use strict';
const cfg=g.HEIPublisherConfig||{};
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
g.HEIPublisher={link:function(kind,value){
 if(value===null||value===undefined||!String(value).trim())return '';
 const raw=String(value).trim(),href=(cfg.documents[kind]||{})[raw];
 return href?'<a class="hei-document" href="'+esc(href)+'" target="_blank" rel="noopener noreferrer">Open '+(kind==='photo'?'Photo':'MTR')+'</a>':esc(raw)+' <small>(file unavailable)</small>';
}};
function controls(){
 if(document.getElementById('hei-publisher-controls'))return;
 const box=document.createElement('div');box.id='hei-publisher-controls';
 const documents=document.createElement('details');documents.className='hei-project-documents';documents.open=false;
 const heading=document.createElement('summary');heading.textContent='Project Documents';documents.appendChild(heading);
 const content=document.createElement('div');content.className='hei-project-documents-content';
 if(cfg.report){const a=document.createElement('a');a.href=cfg.report;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Project Report (PDF)';content.appendChild(a);}
 if(cfg.excel){const a=document.createElement('a');a.href=cfg.excel;a.download='';a.textContent='Open Excel Workbook';a.title='Downloads the XLSX. Supporting documents are not included in this standalone download.';content.appendChild(a);
 if(cfg.excelPackage){const z=document.createElement('a');z.href=cfg.excelPackage;z.download='';z.textContent='Download Excel Package';content.appendChild(z);}
 const note=document.createElement('p');note.textContent='Standalone XLSX: supporting documents are separate. For working document links, copy the complete website folder or extract the entire Excel Package ZIP.';content.appendChild(note);}
 if(cfg.progressEnabled){const details=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Pipeline Progress';details.appendChild(summary);
 (cfg.progress||[]).forEach(p=>{const row=document.createElement('p');row.textContent=p.name+': '+(p.percent===null?'Not Available':p.percent.toFixed(1)+'% | '+p.installed.toFixed(2)+' / '+p.planned.toFixed(2)+' ft')+(p.reason?' - '+p.reason:'');details.appendChild(row);});content.appendChild(details);}
 if(!content.children.length)return;
 documents.appendChild(content);box.appendChild(documents);
 const corner=document.querySelector('.leaflet-control-container .leaflet-bottom.leaflet-left');
 if(corner){box.className='leaflet-control';corner.appendChild(box);
 const avoidAttribution=function(){box.style.marginBottom='10px';const attribution=document.querySelector('.leaflet-control-attribution');if(!attribution)return;const a=attribution.getBoundingClientRect(),b=box.getBoundingClientRect();if(a.left<b.right&&a.right>b.left)box.style.marginBottom=Math.ceil(a.height+12)+'px';};
 documents.addEventListener('toggle',avoidAttribution);g.addEventListener('resize',avoidAttribution,{passive:true});avoidAttribution();
 }else{box.className='hei-documents-floating';document.body.appendChild(box);}
 if(g.L&&g.L.DomEvent){g.L.DomEvent.disableClickPropagation(box);if(g.L.DomEvent.disableScrollPropagation)g.L.DomEvent.disableScrollPropagation(box);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',controls);else controls();
})(window);
