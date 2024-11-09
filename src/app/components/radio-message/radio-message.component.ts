import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DateTimeParser } from '../../clients/open-f1/tools/datetime-parser'
import { RadioMessage } from '../../models/radio-message.model'

@Component({
    selector: 'app-radio-message',
    standalone: true,
    imports: [],
    templateUrl: './radio-message.component.html',
    styleUrl: './radio-message.component.css'
})
export class RadioMessageComponent implements AfterViewInit, OnInit {
    
    public parser = DateTimeParser

    @Input({ required: true })
    public radioMessage!: RadioMessage

    @Output()
    public onListened = new EventEmitter<RadioMessage>()

    @Input({ required: true })
    public requestPlayEmitter!: EventEmitter<string>

    @ViewChild('player')
    public player!: ElementRef

    public ngOnInit() {
        this.requestPlayEmitter.subscribe(guid => {
            const player = this.player.nativeElement as HTMLAudioElement
            console.log("==========================================")
            console.log('guid:', this.radioMessage.guid)
            console.log('listened:', this.radioMessage.listened)
            console.log('isPlaying:', this.radioMessage.isPlaying)
            if (guid === this.radioMessage.guid) {
                if (!this.radioMessage.listened && !this.radioMessage.isPlaying) {
                    console.log('player.play()')
                    //this.radioMessage.setPlaying()
                    player.play()
                }
            } else {
                console.log('player.pause()')
                player.pause()
                player.currentTime = 0;
                this.radioMessage.setPaused()
            }
        })
    }

    public ngAfterViewInit() {
        const player = this.player.nativeElement as HTMLAudioElement
        
        player.addEventListener('ended', () => {
            if (!this.radioMessage.listened) {
                this.radioMessage.setListened()
                this.onListened.emit(this.radioMessage)
            }
        })

        player.addEventListener('play', () => {
            //console.clear()
            console.log('##### Event PLAY #####')
            this.radioMessage.setPlaying()
            this.requestPlayEmitter.emit(this.radioMessage.guid)
        })

        player.addEventListener('pause', () => {
            console.log('##### Event PAUSE #####')
            this.radioMessage.setPaused()
        })
    }
}
