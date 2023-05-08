
$(document).ready(function() {

  const tbody = $('tbody');
  const inputPesquisa = $('#input-pesquisa');

  let aDataLS = [];

  if (localStorage.getItem('data')) {
    aDataLS = JSON.parse(localStorage.getItem('data'));
  }
  let nextCodigo = parseInt(aDataLS[aDataLS.length - 1].codigo) + 1;
  $('#codigo').val(nextCodigo.toString().padStart(6, '0')).prop('disabled', true);

  function renderizarLinha(item) {
    const tr = $('<tr>');
    const tdCodigo = $('<td>').text(item.codigo);
    const tdNome = $('<td>').text(item.nome);
    const tdEmail = $('<td>').text(item.email);
    const tdTelefone = $('<td>').text(item.telefone);
    const tdBotoes = $('<td>').addClass('btn-group');
    const btnApagar = $('<button>').addClass('btn btn-danger').text('Apagar');
    btnApagar.click(function() {
      if (confirm('Deseja realmente apagar este contato?')) {
        aDataLS.pop(item)
        localStorage.setItem('data', JSON.stringify(aDataLS));
        tr.remove();
      }
    });
    tdBotoes.append(btnApagar);

    tr.append(tdCodigo, tdNome, tdEmail, tdTelefone, tdBotoes);
    tbody.append(tr);
  }

  function atualizarTabela(data) {
    tbody.empty();
    data.forEach(item => renderizarLinha(item));
  }
  atualizarTabela(aDataLS);

  inputPesquisa.on('input', function(event) {
    const pesquisa = event.target.value.trim().toLowerCase();
    const resultados = aDataLS.filter(item =>
      item.codigo.includes(pesquisa) ||
      item.nome.toLowerCase().includes(pesquisa) ||
      item.email.toLowerCase().includes(pesquisa) ||
      item.telefone.includes(pesquisa)
    );
    atualizarTabela(resultados);
  });

  $('#form-contato').submit(function(event) {
    event.preventDefault();
    const codigo = $('#codigo').val();
    const nome = $('#nome').val();
    const email = $('#email').val();
    const telefone = $('#telefone').val();

    $('.error').hide();

    if (!nome || !/^[a-zA-Z\s]*$/.test(nome)) {
      $('#nome').next('.error').text('Insira um nome válido').show();
      return;
    }

    if (!email || !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/.test(email)) {
      $('#email').next('.error').text('E-mail inválido').show();
      return;
    }

    if (!telefone || telefone.length !== 15) {
      $('#telefone').next('.error').text('Número de telefone inválido').show();
      return;
    }

    const novoContato = { codigo: codigo.toString().padStart(6, '0'), nome, email, telefone };
    aDataLS.push(novoContato);
    localStorage.setItem('data', JSON.stringify(aDataLS));
    nextCodigo++;
    $('#codigo').val(nextCodigo.toString().padStart(6, '0'));

    renderizarLinha(novoContato);

    $('#nome').val('');
    $('#email').val('');
    $('#telefone').val('');
  });
});