import { StyleSheet } from "react-native";

    //o StyleSheet é a folha de estilo, equivalente ao css
    const styles = StyleSheet.create({
        tela: {
            flex: 1,
            backgroundColor: '#ADD8E6',
        },
        tituloTela: {
            fontSize: 35,
            textAlign: 'center',
            color: 'black',
            top : 30,
        },
        tituloPrincipal: {
            fontSize: 0,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            marginTop: -500
        },
        titulo2: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black'
        },
        botao: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 150,
            height: 50,
            backgroundColor: 'green',
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 20,
            borderRadius: 10,
        },
        botao_fila: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 150,
            height: 50,
            backgroundColor: 'orange',
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 20,
            borderRadius: 10,
        },
        botao_voltar_consulta: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 150,
            height: 50,
            backgroundColor: 'orange',
            paddingVertical: 10,
            paddingHorizontal: 20,
            top: -20,
            borderRadius: 10,
        },
    botaoConsultaCliente: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // <-- Isso centraliza dentro do pai
    width: 150,
    height: 50,
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    },
        texto_botao: {
            fontSize: 20,
            color: 'white'
        },
        botao_vermelho: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            paddingVertical: 10,
            paddingHorizontal: 30,
            marginTop: 20,
            borderRadius: 10
        },

        titulo_campos: {
            fontSize: 20,
            color: 'black'
        },
        caixa_texto: {
            color: 'black',
            fontSize: 20,
            borderWidth: 1,
            borderRadius: 4,
            padding: 10,
            backgroundColor: 'white',
            marginHorizontal: 20,
            marginTop: 20
        },


        largura_70: {
            width: '70%'
        },

        imagem_icone: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            margin: 80

        },

        card: {
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginVertical: 5,
            marginHorizontal: 5,
            backgroundColor: 'white'
        },
        click: {
            opacity: 0.5
        },
        centralizar: {
            alignItems: 'center'
        },


        texto_positivo: {
            fontSize: 18,
            color: 'green',
            fontWeight: 'bold',
            marginTop: 5
        },
        texto_negativo: {
            fontSize: 18,
            color: 'red',
            fontWeight: 'bold',
            marginTop: 5
        }
    });

    export { styles };