# hanzo-engine paper. Numbers are injected by the bench harness as results-data.tex
# (and board.tex); absent, the paper typesets "run pending". See scripts/bench_stats.py.
MAIN=main
.PHONY: all clean view
all: $(MAIN).pdf
$(MAIN).pdf: $(MAIN).tex references.bib figures/architecture.tex results-data.tex results-spec.tex results-board.tex results-board-4b.tex
	latexmk -pdf -halt-on-error -interaction=nonstopmode $(MAIN).tex
results-board-4b.tex:
	@test -f $@ || printf '\\begin{tabular}{@{}llrrrrl@{}}\\toprule backend & phase & $$n$$ & hanzo & llama & ratio & verdict\\\\\\midrule \\textit{\\small run pending} & & & & & &\\\\\\bottomrule\\end{tabular}\n' > $@
# The harness writes these; provide stubs so a clean checkout builds standalone.
results-data.tex:
	@test -f $@ || printf '%% no measured data yet; paper shows "run pending"\n' > $@
results-board.tex:
	@test -f $@ || printf '\\begin{tabular}{@{}llrrrrl@{}}\\toprule backend & phase & $$n$$ & hanzo & llama & ratio & verdict\\\\\\midrule \\textit{\\small run pending} & & & & & &\\\\\\bottomrule\\end{tabular}\n' > $@
clean:
	latexmk -C $(MAIN).tex 2>/dev/null || true
	rm -f $(MAIN).aux $(MAIN).log $(MAIN).out $(MAIN).bbl $(MAIN).blg $(MAIN).fdb_latexmk $(MAIN).fls
view: all
	@xdg-open $(MAIN).pdf 2>/dev/null || open $(MAIN).pdf 2>/dev/null || true
results-spec.tex:
	@test -f $@ || printf %% no spec data yet\n > $@
