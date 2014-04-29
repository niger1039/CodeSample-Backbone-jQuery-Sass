<?php 
    header('Content-type: application/json'); 
    
    $demo = array(
        'intro' => array(
            'subtitle' => 'Case study: Lorem ipsum dolor sit amet, consectetur adipiscing elit ed laoreet.',
            'text' => 'Ut ac sapien nisi. Etiam risus ante, vulputate consequat magna eget, dapibus cursus risus. Vivamus libero elit, eleifend at lorem ornare, pharetra aliquam mi. Nullam nec quam adipiscing, accumsan odio a, vulputate metus. <br /><br />Morbi ultrices eget lacus in posuere. Nunc a libero bibendum, vehicula ipsum in, aliquet odio. Aliquam mattis libero eu fermentum lacinia. Pellentesque malesuada ultrices purus pharetra aliquam. Nam vulputate, turpis non volutpat commodo, felis massa suscipit nisi, ac pharetra elit velit vitae est. <br /><br />Sed convallis molestie felis id pellentesque. Quisque quam augue, faucibus eu sem et, pharetra congue dolor.Nunc rhoncus ut tellus vitae lacinia. Aliquam mattis vulputate purus, et placerat turpis molestie eu. Proin porttitor vehicula metus quis iaculis. <br /><br />Quisque convallis odio mattis nunc tincidunt, sit amet vestibulum risus mattis. Phasellus pharetra faucibus turpis, ac tincidunt libero lobortis et.',
        ),
        'steps' => array(
            'text' => 'Ut tempus massa a lectus pulvinar, ut tincidunt metus dapibus. Integer eu dapibus sapien. Vestibulum eros nibh, consectetur ac diam sit amet, interdum feugiat nulla. Ut blandit, metus nec lacinia semper, velit lorem sagittis urna, aliquet adipiscing arcu diam at risus. Aliquam aliquam sit amet ligula ut lobortis.',
            'benefitsText' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet tincidunt faucibus. Phasellus lectus felis, ultrices quis fermentum nec, congue eget eros: <ul><li>Phasellus in consequat metus, fermentum blandit magna.</li><li>Proin non pulvinar quam. Mauris ut purus sagittis massa gravida molestie nec ut tortor. </li><li>Praesent vitae tortor at leo molestie cursus at porta odio. Integer euismod suscipit erat, eget suscipit nisi mattis vel.</li><li>In non eros et erat pretium pulvinar quis vulputate ante. Duis ultrices ultricies purus, ut rhoncus justo molestie vel. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. </li></ul>'
        )
    );
?>
<?=$_GET['callback']?>([
    {
        color: 'green',
        title: 'SINGLE VIEW OF THE CUSTOMER',
        case_study: 'Telecom',
        intro: {
            title: 'SINGLE VIEW OF<br />THE CUSTOMER',
            subtitle: '<?=$demo['intro']['subtitle']?>',
            text: '<?=$demo['intro']['text']?>'
        },
        steps: [
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {
                isBenefit: true,
                text: '<?=$demo['steps']['benefitsText']?>'
            }
        ]
    },
    {
        color: 'blue',
        title: 'CASE MANAGEMENT',
        case_study: 'Banking',
        intro: {
            title: 'CASE MANAGEMENT',
            subtitle: '<?=$demo['intro']['subtitle']?>',
            text: '<?=$demo['intro']['text']?>'
        },
        steps: [
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {
                isBenefit: true,
                text: '<?=$demo['steps']['benefitsText']?>'
            }
        ]
    },
    {
        color: 'yellow',
        title: 'VOICE OF THE CUSTOMER',
        case_study: 'Insurance',
        intro: {
            title: 'VOICE OF<br />THE CUSTOMER',
            subtitle: '<?=$demo['intro']['subtitle']?>',
            text: '<?=$demo['intro']['text']?>'
        },
        steps: [
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {
                isBenefit: true,
                text: '<?=$demo['steps']['benefitsText']?>'
            }
        ]
    },
    {
        color: 'purple',
        title: 'SELF-SERVICE',
        case_study: 'Energy and utilities',
        intro: {
            title: 'SELF-SERVICE',
            subtitle: '<?=$demo['intro']['subtitle']?>',
            text: '<?=$demo['intro']['text']?>'
        },
        steps: [
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {text: '<?=$demo['steps']['text']?>'},
            {
                isBenefit: true,
                text: '<?=$demo['steps']['benefitsText']?>'
            }
        ]
    }
]);