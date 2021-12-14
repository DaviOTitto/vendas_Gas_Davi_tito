Post = {
    add:() =>{
        var t = {}
        t.nome = $("#nome").val();
        t.senha= $("#password").val();
        t.cpf =$("#cpf").val();
        t.cep=$('#cep').val();
        t.email =$('#email').val();
  
       $.ajax ({
         type : 'POST',
         url  : '/usuarios',
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
   
   
    
    var cpf = $('<p></p>')
    .attr('class','cpf')
    .html('cpf do cliente :' +data.cpf+ ' ')
   
    var html3=$('<label></label>')
    .html(' endereço : ')
    var cep = $('<textarea></textarea>')
    .attr('class','endereco')
    .attr('disabled',true)
    .html(data.cep)


    var html4=$('<label> </label>')
    .html('email : ')
    
    var email =$('<input/>')
      .attr('class','email')
      .attr('value',data.email)
      .attr('disabled',true)

  
     var user= $('<label></label>')
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
    
    $(comment).append(cpf)
    
    $(comment).append(html3)
    $(comment).append(cep)
    
    $(comment).append(html4)
    $(comment).append(email)
    
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
      url: '/usuarios?nome=' + $("#content-search").val(),
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
  
  
  
  
  
  