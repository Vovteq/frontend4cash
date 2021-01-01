import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ModalService} from "../../services/modal.service";
import {animate, group, state, style, transition, trigger} from "@angular/animations";
import {PostInfo} from "../../../scripts/ts/metadata/Post";
import {User, UserInfo} from "../../../scripts/ts/metadata/User";
import {PostComponent} from "../../general-components/post/post.component";
import {PostsContainerDirective} from "../../directives/posts-container.directive";
import {PostService} from "../../services/post.service";
import VMath from "../../../scripts/ts/utils/VMath";

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(200px)' }),
        group([
          animate('300ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({ opacity: 1 })),
          animate('800ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({ transform: 'translateY(0)' })),
        ])
      ])
    ]),
    trigger('post', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(100px)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        style({opacity: 0, transform: 'translateX(0)'}),
        animate('300ms cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({opacity: 0, transform: 'translateX(-100px)'}))
      ])
    ]),

    trigger('loading', [
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms ease-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 0}),
        animate('500ms ease-in', style({opacity: 0}))
      ])
    ]),

    trigger('postNew', [
      state(
        'disappear',
        style({opacity: 0, transform: 'translateX(-100px)'})
      ),
      state(
        'appear',
        style({opacity: 1, transform: 'translateX(0)'})
      ),
      transition('void => appear', animate('300ms ease-out')),
      transition('appear => disappear', animate('300ms cubic-bezier(0.175, 0.885, 0.320, 1.275)'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class ForumPageComponent implements OnInit {

  private _posts: PostInfo[] = [];

  private postAppear: boolean;
  private loadBusy: boolean;
  public dataLoading: boolean;

  private offset = 0;

  @ViewChild(PostsContainerDirective, {static: true}) containerHost: PostsContainerDirective;

  private currentRefs: ComponentRef<PostComponent>[] = [];

  public get posts(): PostInfo[] {
    return this._posts;
  }

  public rightLimit(): boolean {
    return this.posts.length - this.offset <= 5;
  }

  public leftLimit(): boolean {
    return this.offset < 5;
  }

  public get nextButton(): HTMLElement {
    return document.querySelector('#postNextPage');
  }

  public get prevButton(): HTMLElement {
    return document.querySelector('#postPrevPage');
  }

  constructor(public userService: UserService, private postService: PostService, public modalService: ModalService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

    this.dataLoading = true;
    this.postService.getNPosts(50).subscribe((posts) => {
      this._posts = posts;
      this.dataLoading = false;
      console.log(posts);

      if (this.posts.length > 5) {
        this.nextButton.addEventListener('click', () => {
          if (!this.loadBusy && !this.rightLimit()) {
            this.loadNext();
          }
        });

        this.prevButton.addEventListener('click', () => {
          if (!this.loadBusy && !this.leftLimit()) {
            this.loadPrev();
          }
        });
      }

      this.updateButtons();

      if (this.posts.length > 0) {
        setTimeout(() => {
          this.loadBusy = true;
          for (let i = 0; i < VMath.limit(this.posts.length, 5); i++) {
            setTimeout(() => {
              this.createPost(this.posts[i], true);
            }, i * 50);
          }
        }, 100);

        setTimeout(() => {
          this.loadBusy = false;
        }, VMath.limit(this.posts.length, 5) * 50);
      }

    }, error => {this.dataLoading = false});
  }

  private createPost(info: PostInfo, appearRight: boolean) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(PostComponent);
    const ref = this.containerHost.viewContainerRef;

    const componentRef = ref.createComponent<PostComponent>(factory);
    this.currentRefs.push(componentRef);
    componentRef.instance.appearRight = appearRight;
    componentRef.instance.requestData = false;
    componentRef.instance.prebuiltData = info;
    componentRef.instance.render = true;
    componentRef.instance.el.nativeElement.style.marginBottom = '1rem';
  }

  public loadNext() {
    this.offset = VMath.limit(this.offset + 5, this.posts.length);
    this.reRender(false);
  }

  public loadPrev() {
    this.offset = VMath.clamp(this.offset - 5, 0, this.posts.length);
    this.reRender(true);
  }

  private reRender(disappearRight: boolean): void {
    this.loadBusy = true;
    this.updateButtons();

    for (let i = 0; i < this.currentRefs.length; i++) {
      setTimeout(() => {
        this.currentRefs[i].instance.fadeRight = disappearRight;
        this.currentRefs[i].instance.render = false;
      }, i * 50);
    }

    setTimeout(() => {
      this.currentRefs.forEach((ref) => ref.destroy());
      this.currentRefs = [];
      for (let i = this.offset; i < VMath.limit(this.offset + 5, this.posts.length); i++) {
        setTimeout(() => {
          this.createPost(this.posts[i], !disappearRight);
        }, i * 50);
      }
    }, 500);

    setTimeout(() => {this.loadBusy = false;}, 5 * 50);
  }

  private updateButtons() {
    if (this.leftLimit()) {
      this.prevButton.style.borderRightColor = '#575757';
      this.prevButton.style.cursor = 'inherit';
    } else {
      this.prevButton.style.borderRightColor = '#4287f5';
      this.prevButton.style.cursor = 'pointer';
    }

    if (this.rightLimit()) {
      this.nextButton.style.borderLeftColor = '#575757';
      this.nextButton.style.cursor = 'inherit';
    } else {
      this.nextButton.style.borderLeftColor = '#4287f5';
      this.nextButton.style.cursor = 'pointer';
    }
  }

}
