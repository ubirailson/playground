package br.com.alura.forum.controller;

import java.util.List;

import java.util.Arrays;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.alura.forum.modelo.Curso;
import br.com.alura.forum.modelo.Topico;

@Controller
public class TopicosController {

	@RequestMapping("/topicos")
	@ResponseBody
	public List<Topico> listar() {
		Topico topico = new Topico("Duvida", "conteudo duvida", 
				new Curso("CUrso teste", "categoria teste"));
		Topico topico2 = new Topico("Duvida2", "conteudo duvida2", 
				new Curso("CUrso teste2", "categoria teste2"));
				
		return Arrays.asList(topico, topico2);
	}
}
