import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{

  listPost: Post[] = [];
  post: Post = new Post;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.findPosts()
  }

  findPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.listPost = posts.sort((a, b) => {
        return +b.id - +a.id;
      });
    });
  }

  enviarComentario(){
    this.postService.postMensagem(this.post).subscribe((posts: Post) => {
      this.post = posts;
      location.assign('/feed')
    })
  }

}
