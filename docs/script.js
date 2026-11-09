const nome = document.getElementById("nome")
const cpf = document.getElementById("cpf")
const div_cli = document.getElementById("clientes")
const clientes = [] || localStorage.getItem("clientes")


async function cadastrar_cliente() {
    alert("sd")
    let cliente = {
        nome: nome.value,
        cpf: cpf.value
    }
    clientes.push(cliente)
    await fetch('http://localhost:3000/api/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    })
    localStorage.setItem("clientes", JSON.stringify(clientes))
    buscar_cliente()
}
async function buscar_cliente(){
    const busca = await fetch("http://localhost:3000/api/cliente")
    const dados = await busca.json()
    clientes.length = 0
    clientes.push(...dados)
    listar_clientes()
}
async function editar_cliente(){
    const c = await clientes.find(item => item.cpf === cpf.value)
    console.log(c)
    if(c){
        let cliente_atualizado = {
            nome: nome.value ?? c.nome,
            cpf: cpf.value ?? c.cpf
        }
        let resposta = await fetch(
            `http://localhost:3000/api/cliente/${c.cpf}`,{
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(cliente_atualizado)
        })
        buscar_cliente()
    }
}
async function deletar_cliente(){
    const c = await clientes.find(item => item.cpf === cpf.value)
    console.log(c)
    if(c){
        let resposta = await fetch(
            `http://localhost:3000/api/cliente/${c.cpf}`,{
            method:"DELETE"
        })
        buscar_cliente()
    }

}
function listar_clientes(){
    div_cli.innerHTML = "<h2>Clientes Cadastrados</h2>"
    for(let c of clientes)
        div_cli.innerHTML += `<p>Nome:${c.nome}</p>`
}
buscar_cliente()