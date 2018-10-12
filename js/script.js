

const $body = $('body');

function gameStart(){
  gridGenerator(10,10);
  pickRandomLizardPosition();
}

gameStart();

function pickRandomLizardPosition(){
  const $lastRow = $( 'table tr:last-child' );

  // first td
  // $lastRow[0].cells[1];
  const lastRowLength = $lastRow[0].cells.length;
  const randomNum = Math.floor(Math.random() * lastRowLength);
  //random td
  const $lizardPosition = $($lastRow[0].cells[randomNum]);

  //***********add class to make bg colour ****************

  console.log($lizardPosition);
}





// class LizardObjCreator {
//   constructor(div) {
//     this.div = div;
//   }
//   createLizard(){
//     const $lizardDiv = $('<div></div>');
//     //choose random td on the last tr
//
//   }
// }

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
