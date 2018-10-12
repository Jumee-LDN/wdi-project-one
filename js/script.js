
const $body = $('body');


function grid(rows, cols){
  const $container = $('<table></table>');
  $body.append($container);
  $container.addClass('grid');
  let i = 1;

  for(let r = 0; r < rows; r++) {
    const $tr = $('<tr></tr>');
    $container.append($tr);
    $tr.attr('id', 'box'+ i);


    for(let c = 0; c < cols; c++){
      const $td = $('<td></td>');
      $tr.append($td);
      $td.attr('id', 'box'+ i);
      $td.addClass('box');
      $td.append(i++);
    }
  }

}

grid(5,5);
