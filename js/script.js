

const $body = $('body');
const $lizardImg = $('#lizard');
let $currentLizardPosition = $();


function gameStart(){
  gridGenerator(5,5);
  pickRandomLizardPosition();
}

gameStart();


function pickRandomLizardPosition(){
  const $lastRow = $('table tr:last-child');
  // first td of the last tr ==> $lastRow[0].cells[1];
  const lastRowLength = $lastRow[0].cells.length;
  const randomLizardPosition = Math.floor(Math.random() * lastRowLength);

  $currentLizardPosition = $($lastRow[0].cells[randomLizardPosition]);
  $currentLizardPosition.prepend('<img id="lizard" src="https://www.freeiconspng.com/uploads/lizard-icon-30.png" />');
  $lizardImg.addClass('lizard');
  console.log($currentLizardPosition);

}


// *********CHANGE LIZARD POSITION BY KEY**************



function gridGenerator(rows, cols){
  const $container = $('<table></table>');
  $body.append($container);
  $container.addClass('grid');
  let i = 1;

  for(let r = 1; r <= rows; r++) {
    const $tr = $('<tr></tr>');
    $container.append($tr);
    $tr.attr('id', 'row'+ r);


    for(let c = 0; c < cols; c++){
      const $td = $('<td></td>');
      $tr.append($td);
      $td.attr('id', 'box'+ i);
      $td.addClass('grid-box');
      $td.append(i++);
    }
  }
}
