import { Component } from 'react/cjs/react.production.min';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class  CharInfo extends Component {
    
    state = {
        char:null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();    
    
    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId) {
            return;
        }
        
        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoading = (char) => {
        this.setState({
            loading: true
        });
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton =  char || loading || error ? null: <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null; 
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}                
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        comics.map((item, i) => {
                            return (
                                <li key={i}>
                                    {item.name}
                                </li>
                            )
                        })
                    }
                    <li className="char__comics-item">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </li> 
                </ul>
        </>
    )    
}

export default CharInfo;