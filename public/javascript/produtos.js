Post = {
    add:() =>{
        var t = {}
        t.nome = $("#nome").val();
        t.valor= $("#valor").val();
  
       $.ajax ({
         type : 'POST',
         url  : '/produtos',
         data : t,
         dataType :'json',
         success: Post.template
       })
    return false;
  },
  template : (data) => {
    var comment = $('<div></div>')
    .attr('id','comment'+data.id)
    .attr('class', 'comment')
    var html =$('<label></label>')
    .html('nome : ') 
    var nome = $('<textarea></textarea>')
    .attr('class','nome')
    .attr('disabled',true)
    .html(data.nome)
   
    var html2 =$('<label></label>')
    .html(' valor R$ : ')
    
    var valor = $('<input/>')
    .attr('class','valor')
    .attr('disabled',true)
    .attr('type','number')
    .attr('value',data.valor)

    var user= $('<p></p>')
  .attr('class', 'user')
  .html('alterado por :' +/*alguem */+'data : ')
    var dtCreation = new Date(data.createdAt)
    dtCreation = (dtCreation.getDate() <10 ? "0" + dtCreation.getDate() : dtCreation.getDate()) 
    + "/" + ((dtCreation.getMonth()+1)<10 ?"0"
    + (dtCreation.getMonth()+1) : (dtCreation.getMonth() +1) 
    + (dtCreation.getMonth()+1)) 
    + "/" + dtCreation.getFullYear()
   
    var date = $('<span></span>').attr('class','date').html(dtCreation)
     var btnEdit = $('<button></button>').attr('class','edit').html("edit")
     var btnSave = $('<button></button>').attr('class','save').html("save").hide();
     var btnRemove = $('<button></button>').attr('class','remove').html("remove")
     
     $(btnEdit).on('click',(event) => {
       Post.enableEdit(event.target)
     })   
     $(btnSave).on('click',(event) => {
      Post.update(event.target)
    })   
    $(btnRemove).on('click',(event) => {
      Post.remove(event.target)
    })   
  
    $(user).append(date);
  
   $(comment).append(html)
    $(comment).append(nome)
    $(comment).append(html2)
    
    $(comment).append(valor)
   $(comment).append(btnEdit)
   $(comment).append(btnSave)
   $(comment).append(btnRemove)
     $('#comments')
    $("#comments").append(comment)
    
  
  },
  enableEdit:(button) => {
  var comment = $(button).parent();
  
  $(comment).children('textarea').prop('disabled', false)
  $(comment).children('button.edit').hide();
  $(comment).children('button.save').show();
  
  },
  
  update : (button) =>{
    var comment = $(button).parent(); 
    
    var id = $(comment).attr('id').replace('comment', '')
    var nome = $(comment).children('textarea').val();
    var valor = $(comment).children('input').val();
    $.ajax({
      type:"put",
      url:'/produtos',
      data : {'nome':nome ,'id' : id },
      success : (data) => {
          $(comment).children('textarea').prop('disabled', true)
          $(comment).children('button.edit').show();
          $(comment).children('button.save').hide();
           
      },
      error : () =>
      {
        console.log("ocorreu uma falha")
      },
      dataType:"json"
  
    })
  
  
  },
  
  
  remove  :(button) => {
    var comment = $(button).parent(); 
    
    var id = $(comment).attr('id').replace('comment', '')
    $.ajax({
      type:"delete",
      url:'/produtos',
      data : {'id': id },
      success : (data) => {
          $(comment).remove();
           
      },
      error : () =>
      {
        console.log("ocorreu uma falha")
      },
      dataType:"json"
  
    })
  },
  
  findAll:() =>{
    $.ajax({
      type:"GET",
      url: '/produtos?nome=' + $("#content-search").val(),
      success : (data) => {
        $("#comments").empty()
        for(var post of data){
          Post.template(post)
        }     
      },
      error : () =>
      {
        console.log("ocorreu uma falha")
      },
      dataType:"json"
  
    })
  },
  
  }
  console.log("content-seach")
  $(document).ready(()=>{
    Post.findAll();
  })
  
  
  
  
  
  