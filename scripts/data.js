let aData = [ 
    { 
        codigo : '001001' , 
        nome: 'Jose da Silva', 
        email :'jose@email.com' , 
        telefone : '(11) 99901-1234' 
    } ,
    { 
        codigo : '001002' , 
        nome: 'Marcio de Souza', 
        email : 'marcio@email.com' , 
        telefone : '(11) 99902-1234' 
    },
    { 
        codigo : '001003' , 
        nome: 'Mauricio Cruz', 
        email : 'mauricio@email.com' , 
        telefone : '(11) 99903-1234' 
    },
    { 
        codigo : '001004' , 
        nome: 'Fabiana Dias', 
        email : 'fabiana@email.com', 
        telefone : '(11) 99904-1234' 
    }
  ]
  if(!localStorage.getItem('data')){
    localStorage.setItem('data', JSON.stringify(aData));
  }
