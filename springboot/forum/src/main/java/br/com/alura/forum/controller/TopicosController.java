package br.com.alura.forum.controller;

import java.net.URI;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.alura.forum.controller.dto.DetalhesDoTopicoDto;
import br.com.alura.forum.controller.dto.TopicoDto;
import br.com.alura.forum.controller.form.AtualizacaoTopicoForm;
import br.com.alura.forum.controller.form.TopicoForm;
import br.com.alura.forum.modelo.Topico;
import br.com.alura.forum.repository.CursoRepository;
import br.com.alura.forum.repository.TopicoRepository;


/*
 * @Controller //espera-se que o redirecionamento seja para uma página
 * 
 */
@RestController
@RequestMapping("/topicos")
public class TopicosController {

	
	@Autowired
	private TopicoRepository topicoRepository;
	
	@Autowired
	private CursoRepository cursoRepository;
	
	@GetMapping
	//o value eh identificador unico do cacha desse metodo
	@Cacheable(value = "listaDeTopicos")
//	@RequestMapping("/topicos")
/*
 * @ResponseBody //usado pra dizer que o objeto de retorno deve ser serializado
 * 				 // e retornado como resposta
 * 			  	 // torna-se desnecessario quando se usa @RestController
 * 				 // ao invés de @Controller
 */		
	/*
	 * @RequestParam explicita o parametro, ele é parte da URL e é obrigatorio
	 * */
	
//	public Page<TopicoDto> listar(@RequestParam(required = false) String nomeCurso,
//			@RequestParam int pagina, @RequestParam int quantidade,
//			@RequestParam String ordenacao) {
	
//utilizando Pageable na assinatura do método para simplificacao da paginacao	
//Precisou usar @EnableSpringDataWebSupport no main do spring
/*Parametros terao que ser page, size e sort. Sendo que sort recebe nome do atributo
 * com virgula asc ou desc. Ex: 
 * http://localhost:8080/topicos?page=0&size=1&sort=id,asc
 * Pode-se acumular o sort. Ex:
 * http://localhost:8080/topicos?page=0&size=1&sort=id,asc&sort=dataCriacao,desc
 *
 *PageableDefault dá uma paginação padrão que pode ser ignorada ao ser sobrescrita
 */
	public Page<TopicoDto> listar(@RequestParam(required = false) String nomeCurso,
			@PageableDefault(sort = "id", direction = Direction.DESC,
			page = 0, size = 10) Pageable paginacao) {
		
//		Pageable paginacao = PageRequest.of(pagina, quantidade, Direction.ASC, 
//				ordenacao);
		if (nomeCurso == null) {
			Page<Topico> topicos = topicoRepository.findAll(paginacao);
			return TopicoDto.converter(topicos);
		} else {
			Page<Topico> topicos = topicoRepository.findByCursoNome(nomeCurso, paginacao);
			return TopicoDto.converter(topicos);
		}
	}
	
	@PostMapping
	@Transactional
	@CacheEvict(value = "listaDeTopicos", allEntries = true)
	public ResponseEntity<TopicoDto> cadastrar(@RequestBody @Valid TopicoForm form,
			UriComponentsBuilder uriBuilder) {
		Topico topico = form.converter(cursoRepository);
		topicoRepository.save(topico);
		URI uri = uriBuilder.path("topicos/{id}").buildAndExpand(topico.getId()).toUri();
		return ResponseEntity.created(uri).body(new TopicoDto(topico));
	}
	
	
//  Se o nome da variável for diferente do que tem no path
//	Precisa definir no PathVariable que se refere a ele	
//	@GetMapping("/{id}")
//	public TopicoDto detalhar(@PathVariable("id") Long codigo) {
	
	@GetMapping("/{id}")
	public ResponseEntity<DetalhesDoTopicoDto> detalhar(@PathVariable Long id) {
		Optional<Topico> topico = topicoRepository.findById(id);
		if (topico.isPresent()) {
			return ResponseEntity.ok(new DetalhesDoTopicoDto(topico.get()));
			
		}
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/{id}")
	@Transactional
	@CacheEvict(value = "listaDeTopicos", allEntries = true)
	public ResponseEntity<TopicoDto> atualizar(@PathVariable Long id,
			@RequestBody @Valid AtualizacaoTopicoForm form) {
		Optional<Topico> optional = topicoRepository.findById(id);
		if (optional.isPresent()) {
			Topico topico = form.atualizar(id, topicoRepository);
			return ResponseEntity.ok(new TopicoDto(topico));
			
		}
		return ResponseEntity.notFound().build();
		
		
		
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	@CacheEvict(value = "listaDeTopicos", allEntries = true)
	public ResponseEntity<?> remover(@PathVariable Long id) {
		Optional<Topico> optional = topicoRepository.findById(id);
		if (optional.isPresent()) {
			topicoRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}

		return ResponseEntity.notFound().build();
	}
}
