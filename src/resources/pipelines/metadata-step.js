export class MetadataStep {
    run(navigationInstruction, next) {
        const title = navigationInstruction.getAllInstructions()[0].config.title;
        const canonicalRoute = navigationInstruction.getAllInstructions()[0].config.route;
        const metaDescription = navigationInstruction.getAllInstructions()[0].config.settings.metaDescription;
        if (metaDescription) {
            //Set Description
            let matches = document.querySelectorAll('meta[name="description"]');
            if (matches.length) {
                let tag = matches[0];
                tag.content = metaDescription;
            } else {
                let tag = document.createElement('meta');
                tag.setAttribute('name', 'description');
                tag.content = metaDescription;
                document.getElementsByTagName('head')[0].appendChild(tag);
            }

            //Set og:description
            let ogDescriptionMatches = document.querySelectorAll('meta[property="og:description"]');
            if (ogDescriptionMatches.length) {
                let tag = ogDescriptionMatches[0];
                tag.content = metaDescription;
            } else {
                let ogDescription = document.createElement('meta');
                ogDescription.setAttribute('property', 'og:description');
                ogDescription.content = metaDescription;
                document.getElementsByTagName('head')[0].appendChild(ogDescription);
            }

            //Set og:title
            let ogTitleMatches = document.querySelectorAll('meta[property="og:title"]');
            if (ogTitleMatches.length) {
                let tag = ogTitleMatches[0];
                tag.content = title;
            } else {
                let ogDescription = document.createElement('meta');
                ogDescription.setAttribute('property', 'og:title');
                ogDescription.content = title;
                document.getElementsByTagName('head')[0].appendChild(ogDescription);
            }

            //Set connical
            let connicalMatch = document.querySelectorAll('link[rel="canonical"]');
            if (connicalMatch.length) {
                let tag = connicalMatch[0];
                tag.href = canonicalRoute;
            }
        }
        return next();
    }
}
