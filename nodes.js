const url = "https://sheets.googleapis.com/v4/spreadsheets/1ibbywsC1tQ_sLPX8bUAjC-vrTrUqZgZA46W_sxWw4Ss?key=1eac3a9269175c46fba03da3aba54b77c0df2537&includeGridData=true";
function reformat_numbers(num) {
    if (num === undefined)
        return ''
    values = num.split(',')
    if (values.length < 2) {
        return num
    } else if (values.length == 2) {
        return values[0] + 'K'
    } else
        return values[0] + 'M'
}

function reformat_dialect(dialect)
{
    
    if (dialect.trim() != 'other')
    {
        dialect = dialect.split(':')[0]
        dialect = dialect.split('-')[1]
    }
    
    return dialect
}

function reformat_tasks(tasks)
{
    let out_html = ''

    tasks = tasks.split(',')
    for(let j = 0 ; j < tasks.length ; j += 1){
        out_html += tasks[j]+'</br>'
    }

    return out_html
}

function createHtml(i)
{
    let div = '<div style="font-family: Cairo, "Open Sans"> '
    let table = '<table style="border-collapse: collapse; border: none;">'
    let html_out = div + table 
    let list_to_show = ['Name', 'Year','Dialect', 'Volume', 'Tasks']
    for(let j = 0 ; j < list_to_show.length ; j += 1){

        let index_to_header = headersWhiteList.indexOf(list_to_show[j])
        let header = headersWhiteList[index_to_header]
        let value = ' ' +dataset[i][index_to_header]
        html_out += '<tr style="border: none;">'
        html_out += '<td style="border: none;">'
        html_out += '<b>'+header+'</b>'
        html_out += '</td>'
        html_out += '<td style="border: none;">'
        
        if(header == 'Volume')
        {
            html_out += reformat_numbers(value)+ ' '+ dataset[i][index_to_header+1]
        }
        else if (header == 'Name')
        {
            html_out += `<a href = "">${value}</a>`
        }
        else if (header == 'Dialect')
        {
            html_out += reformat_dialect(value)
        }
        else if (header == 'Tasks'){
            html_out += reformat_tasks(value)
        }
        else
        {
            html_out += value
        }
        
        html_out += '</td>'
        html_out += '</tr>'
    }

    return html_out+'</table>'+'</div>'
}
axios.get(url, ).then(function(response) {
    let rowData = response.data.sheets[0].data[0].rowData
    let headers = []
    headersWhiteList = ['Name', 'Link', 'License', 'Year', 'Language', 'Dialect', 'Domain', 'Form', 'Volume', 'Unit', 'Ethical Risks', 'Script', 'Access', 'Tasks', 'Venue Type']
    $('.loading-spinner').hide()
    
    // Grabbing header's index's to help us to get value's of just by header index 
    rowData[1].values.filter(header => header.formattedValue != undefined).forEach((header, headerIndex) => {
        if (headersWhiteList.includes(header.formattedValue)){
            headers.push({
                index: headerIndex,
                title: header.formattedValue
            })
        }
    })

    // console.log(headers)
    let tempRows = []
    rowData.filter(row => {
        tempRows.push(row.values)
    })
    
    // Grabbing row's values
    let rows = []
    for (let index = 2; index < tempRows.length; index++) {
        const fileds = tempRows[index]
        if (fileds != undefined) {
            // if (!isNaN(fileds[0].formattedValue)){
                rows.push(fileds)
            // }
        }
        
    }
    
        //  Createing table data
        dataset = []
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            let entry = {}
            if (isNaN(row[0].formattedValue))
            {
                continue
            }
            for (let index = 0; index < headersWhiteList.length; index++) {
                entry[index] = row[headers[index].index].formattedValue
            }
            dataset.push(entry)
        }
        console.log(dataset[0])
            var embeddings = {"columns":[0,1],"index":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],"data":[[27.2004699707,19.1345710754],[21.7362327576,6.455537796],[12.949839592,22.0612659454],[16.4917411804,4.8296871185],[21.1279258728,4.7324018478],[22.1837902069,29.7880554199],[17.2120342255,18.66954422],[21.3132705688,6.9577722549],[7.9615688324,8.7639408112],[21.7500019073,22.9972114563],[28.8545761108,27.8450508118],[27.5043506622,20.7677326202],[20.6989364624,6.4708557129],[5.0093460083,14.6507606506],[30.7163276672,20.1788215637],[18.061252594,5.9597787857],[32.8472595215,20.7602825165],[13.2747688293,11.4429988861],[19.4721164703,6.8875055313],[29.188785553,31.0869560242],[24.5135688782,36.1645927429],[9.7964458466,8.0462970734],[20.3307094574,21.3334522247],[7.7372303009,12.2497444153],[20.465461731,13.9286251068],[19.8179740906,21.7397422791],[19.1578903198,15.6961927414],[27.7305545807,37.6300048828],[23.201839447,23.6915512085],[32.2387084961,17.880317688],[32.2386779785,17.8798732758],[31.169260025,18.0402832031],[29.0368766785,18.1655483246],[31.8203353882,20.5324058533],[31.0120925903,17.9186553955],[19.8892745972,11.6940517426],[17.8901901245,8.0467739105],[30.8921775818,25.0113735199],[32.1073646545,34.9941101074],[27.8268241882,18.8190383911],[28.5609264374,25.5663223267],[31.0697441101,14.4990272522],[19.7781925201,23.4570274353],[20.3630714417,18.8420295715],[27.855463028,17.9549751282],[20.1773777008,24.33020401],[13.4930181503,35.6575965881],[28.7469959259,30.0043964386],[30.6468849182,29.8969535828],[24.5373039246,16.2794837952],[24.6101417542,16.3004989624],[9.2395210266,17.1512107849],[27.2732963562,30.2794075012],[24.234287262,25.3416652679],[18.5744781494,21.780632019],[22.9611759186,15.209444046],[27.9032058716,26.9452419281],[34.7840576172,20.1509342194],[1.8466377258,15.6054039001],[14.6778421402,30.5203208923],[4.2895517349,13.1366147995],[19.482711792,33.6384506226],[8.2796201706,14.7277412415],[19.3250007629,32.6759490967],[28.3449668884,28.8575687408],[20.2052116394,33.5197601318],[25.7611618042,23.4668979645],[19.1055450439,11.4626779556],[25.9568195343,22.4209899902],[22.3744449615,26.2977600098],[10.1359615326,18.649553299],[14.7414302826,30.6090259552],[16.2360153198,10.3862876892],[9.4293899536,26.3768882751],[20.4793930054,33.5748825073],[23.3815803528,23.7253036499],[19.7529907227,9.4988603592],[6.7028398514,9.4699316025],[2.3325920105,13.5822906494],[3.3770656586,14.3690624237],[0.4753742218,13.2928905487],[0.6498451233,14.6038637161],[19.2867565155,7.0232334137],[16.6534404755,7.4299554825],[16.6020355225,6.5522289276],[22.6118164062,15.408416748],[29.3956031799,25.3208236694],[31.10131073,11.2580413818],[16.3928279877,8.6000709534],[21.0021018982,9.1803598404],[33.424331665,23.0518989563],[24.0328330994,35.7690963745],[24.1557407379,34.9741325378],[20.7571849823,7.5544652939],[20.5330429077,26.1733436584],[17.6922683716,18.8672962189],[16.8743400574,20.0391693115],[17.2926559448,8.9378900528],[7.9566049576,5.5540685654],[24.4255447388,28.5004653931],[19.3026790619,29.1606445312],[18.9972686768,8.3240585327],[18.9573040009,8.4723291397],[19.9296417236,25.647813797],[35.5225982666,19.671503067],[15.5203142166,17.755695343],[2.759141922,11.9023389816],[19.1297454834,5.1331224442],[3.2951831818,14.1738071442],[28.9613990784,24.2010173798],[33.0466766357,19.3142280579],[25.9513378143,38.1071548462],[15.2759342194,20.2819862366],[17.0824565887,22.5568161011],[26.3506813049,36.7143936157],[17.4111785889,21.0950908661],[22.7399616241,40.3749732971],[32.4571876526,31.801158905],[32.4053878784,32.0717468262],[31.3976821899,37.3515396118],[27.7977523804,35.840675354],[16.6377601624,26.6035308838],[16.4386901855,27.460723877],[18.1818466187,33.3560028076],[29.4643211365,21.185716629],[31.1423797607,35.3465270996],[21.3900566101,26.6823654175],[8.0279426575,17.2191028595],[15.5164375305,7.9086055756],[15.9733524323,9.1205234528],[17.2702350616,17.7128334045],[20.4654865265,13.9284477234],[32.8367080688,29.6824855804],[13.6781597137,7.9169883728],[13.6781654358,7.9160299301],[7.2139492035,8.9975986481],[9.4656734467,26.390542984],[21.2183418274,32.5462379456],[11.675406456,13.7332820892],[32.5678100586,26.7142295837],[17.630235672,10.0316047668],[14.5327262878,9.8552474976],[9.5356016159,17.5468673706],[35.548915863,30.6844959259],[28.7540550232,26.3760719299],[28.4255542755,32.4775314331],[29.0783004761,40.6980476379],[29.4213466644,39.3899765015],[28.5797843933,39.5941925049],[16.6313381195,25.6361083984],[25.5478076935,40.1952896118],[14.5636672974,37.2475891113],[26.7401351929,14.2255535126],[27.3227100372,14.8878040314],[5.3924016953,7.6911964417],[25.5774803162,22.3667869568],[7.881524086,14.8023080826],[17.9111347198,21.1969776154],[30.9301567078,30.3502159119],[19.7173519135,28.2844810486],[30.5493888855,27.2804145813],[18.0040130615,23.920337677],[16.214099884,11.944070816],[9.4950704575,5.7837352753],[26.3041820526,28.1096973419],[27.3353691101,14.9308929443],[22.4387664795,21.5056114197],[18.31590271,9.3818626404],[24.9652061462,24.7178344727],[29.4075737,19.9147224426],[25.9490222931,18.4425048828],[21.6095943451,27.5491542816],[8.3080806732,5.7217445374],[26.6692676544,11.1039819717],[29.3768157959,34.2890701294],[38.242980957,18.7386436462],[38.2496490479,18.7383823395],[0.0,13.1126060486],[2.5913448334,6.8027114868],[33.7885093689,22.6463718414],[12.5015544891,13.4387340546],[41.2116966248,30.3976535797],[24.7869434357,39.7935562134],[23.0828971863,36.0858383179],[6.4078235626,10.4627504349],[34.3725357056,32.7121810913],[17.0745716095,11.9787635803],[36.9829025269,25.1179676056],[35.9296188354,16.7874965668],[18.4363155365,34.8685684204],[21.6298675537,8.8030519485],[7.7387275696,11.5209388733],[18.1825141907,32.1693191528],[22.8035945892,38.4669418335],[13.9594707489,3.7218265533],[13.5728282928,4.2082414627],[14.643576622,37.3500900269],[20.1557197571,18.7378959656],[14.4122142792,13.0402946472],[25.4946632385,35.3044586182],[7.2208995819,18.165813446],[15.302898407,3.0363922119],[22.5102214813,21.3110542297],[13.5207796097,35.670211792],[13.7619800568,18.5092391968],[39.2404632568,32.2562942505],[35.9296989441,16.7877044678],[21.3925247192,39.9313545227],[13.0824832916,11.5057840347],[9.8758945465,11.081445694],[27.2341022491,25.6434612274],[6.8070220947,11.6295347214],[23.4277095795,7.8130884171],[23.719543457,40.0778656006],[11.8885622025,11.1972961426],[3.4355792999,12.6146240234],[7.6750240326,10.1924886703],[3.7489356995,8.4614019394],[1.0586585999,11.9880933762],[31.0569057465,11.6401071548],[7.4147605896,5.013425827],[8.152349472,15.9061203003],[15.1600379944,6.7479658127],[8.3462114334,10.2380046844],[31.3552322388,11.7302875519],[3.0902900696,8.86008358],[12.8080291748,13.2315378189],[3.452009201,12.6265163422],[24.9997329712,37.7106781006],[26.842010498,39.226272583],[27.3711204529,32.9257583618],[33.1085777283,24.659029007],[32.1993637085,32.0053253174],[25.7023239136,37.2960281372],[33.345199585,26.1740531921],[15.0458488464,25.505033493],[19.8737220764,26.8172264099],[35.5489578247,30.6845092773],[39.7718658447,32.2653388977],[20.7726764679,34.9118232727],[15.148692131,18.9395904541],[29.1665229797,35.8146629333],[15.332824707,18.9863109589],[29.144241333,33.9293441772],[28.7968502045,39.227935791],[30.3866271973,35.6889076233],[39.1861343384,32.8920974731],[1.855632782,16.2171192169],[39.8080444336,32.806968689],[14.1128063202,25.416885376],[29.0333003998,37.0490036011]]}
            var clusters = {"columns":[0],"index":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],"data":[[5],[2],[1],[2],[2],[7],[1],[2],[9],[7],[7],[5],[2],[4],[0],[2],[0],[9],[2],[8],[3],[9],[1],[4],[2],[1],[1],[3],[7],[0],[0],[0],[5],[0],[0],[2],[2],[0],[8],[5],[7],[5],[1],[1],[5],[7],[6],[8],[8],[5],[5],[4],[7],[7],[1],[5],[7],[0],[4],[6],[4],[6],[4],[6],[7],[6],[7],[2],[7],[7],[1],[6],[2],[1],[6],[7],[2],[4],[4],[4],[4],[4],[2],[2],[2],[5],[7],[5],[2],[2],[0],[3],[3],[2],[7],[1],[1],[2],[9],[7],[6],[2],[2],[7],[0],[1],[4],[2],[4],[7],[0],[3],[1],[1],[3],[1],[3],[8],[8],[3],[3],[1],[1],[6],[0],[3],[7],[4],[2],[2],[1],[2],[8],[9],[9],[9],[1],[6],[9],[8],[2],[9],[4],[8],[7],[3],[3],[3],[3],[1],[3],[6],[5],[5],[4],[7],[4],[1],[8],[7],[8],[1],[2],[9],[7],[5],[7],[2],[7],[0],[5],[7],[9],[5],[3],[0],[0],[4],[4],[0],[9],[8],[3],[3],[4],[8],[2],[0],[0],[6],[2],[4],[6],[3],[9],[9],[6],[1],[9],[3],[4],[2],[7],[6],[1],[8],[0],[3],[9],[9],[7],[4],[2],[3],[9],[4],[9],[4],[4],[5],[9],[4],[2],[9],[5],[4],[9],[4],[3],[3],[3],[0],[8],[3],[8],[1],[7],[8],[8],[6],[1],[3],[1],[3],[3],[3],[8],[4],[8],[1],[3]]}
            let box = document.querySelector('.box');
            const width = box.offsetWidth;
            const height = 500;

            var svg = d3.select('svg');  
            var dimension = document.body
                .getBoundingClientRect();
            
            var tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("z-index", "10")
            .style("visibility", "hidden")
            ;

            var data = d3.range(0, 220).map(function (d) {
                return {
                x: embeddings['data'][d][1],
                y: embeddings['data'][d][0]
              }
            });

            var x = d3.scaleLinear()
            .domain([-3, 40])
            .range([ 0, width ]);

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 40])
                .range([ height, 0]);

            
            var zoom = d3.zoom()
                .scaleExtent([.5, 10])  // This control how much you can unzoom (x0.5) and zoom (x20)
                .extent([[0, 0], [width, height]])
                .on("zoom", updateChart);
          
            var svg = d3.select("svg")
                .attr('width', width)
                .attr('height', height)
                .attr("style", "outline: thin solid gray;")
                .call(zoom)                       // Adds zoom functionality

            var canvas = svg
                .append("g")
                .attr("class", "zoomable")
            
              function updateChart() {
                if (canvas) {
                    canvas.attr("transform", d3.event.transform);
                    // recover the new scale
                    var newX = d3.event.transform.rescaleX(x);
                    var newY = d3.event.transform.rescaleY(y);
                
                
                    // update circle position
                    canvas.selectAll("circle")
                        .attr('cx', function(d) {return newX(d.x)})
                        .attr('cy', function(d) {return newY(d.y)});
                }
              }

            canvas.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr("r", function(_, i, n){
                    let vol_index = headersWhiteList.indexOf('Volume')
                    if(dataset[i][vol_index] === undefined)
                        return 10
                    let volume = parseInt(dataset[i][vol_index].replaceAll(",",""))
                    return Math.log(volume)
                }) 
                .attr('opacity', 0.7)
                .attr('cx', function(d) {
                    return x(d.x);})
                .attr('cy', function(d) {
                    return y(d.y)})
                .style('fill', function(_, i, n) {
                    const index = clusters['data'][i][0]
                    return d3.schemeCategory10[index]
                }).on("mouseover", function(_, i, n){                    
                    tooltip = tooltip.html(createHtml(i));
                    d3.select(this).style('stroke', '#eaeaea')
                    d3.select(this).style('stroke-width', '5')
                    return tooltip.style("visibility", "visible");
                })
                .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                .on("mouseout", function(){
                    d3.select(this).style('stroke', 'white')
                    d3.select(this).style('stroke-width', '0')
                    return tooltip.style("visibility", "hidden");
                })
                .on("click", function(_, i, n){
                    let url = 'card.html?'+i;
                    window.open(url, '_blank').focus();
                });


    })
    .catch(function(error) {
        console.log(error);
    });

            
